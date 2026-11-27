---
name: review-the-kangaroo
description: Deep-reviews a GitHub PR or a pre-PR local diff end to end (resolve scope, read the diff, orient in the code, analyse, verify every finding, draft). Review text uses plain words and one fixed layout. With an open PR, drafts with REQUEST_CHANGES by default and waits for confirmation before posting with gh. With no PR, or when the user asks to keep the review local (chat only, nothing posted), reviews the working tree, branch, or PR diff in chat only. Use when the user invokes /review-the-kangaroo or asks for a deep review of a PR, branch or working tree.
disable-model-invocation: true
---

# Review the Kangaroo

Read [`human-friendly`](../human-friendly/SKILL.md) before writing any review text. Use plain words for a reader new to the code. Keep commands, paths, issue keys, numbers and dates exact.

Author a deep review: orient → analyse → verify → draft → (confirm → post).

Run the whole review in one session. Do not stop after a plan with empty checkboxes. The first deliverable is always the draft: a verdict, a top comment and a findings table.

Complement: [`address-the-elephant`](../address-the-elephant/SKILL.md) handles the response side (fix → reply → resolve). This skill writes the review.

## Start

Start the review as soon as the skill is invoked. Do not ask questions first.

- No target given: review the current branch against `origin/main`. Find its PR with `gh pr list --head <branch>`. If a PR exists, use PR mode. If not, use Local mode.
- A PR number or URL given: use PR mode, or Local mode if the user asks for a local review.
- Run workflow steps 1 to 6 without pausing. Produce the draft in the same turn.
- Stop only at the PR mode posting gate (step 5). Local mode ends after the draft.
- Hold off only when the user clearly asks you to wait before the review starts. Then do nothing until they ask again.

## Review mode

| Mode      | Scope                                         | Diff source                                              | Deliverable                          | Posts to GitHub    |
| --------- | --------------------------------------------- | -------------------------------------------------------- | ------------------------------------ | ------------------ |
| PR    | PR number or URL                              | `gh pr diff`                                             | Top comment and inline comments      | Yes, after confirm |
| Local | Branch name, or the working tree              | `git diff`, `git diff --cached`, or `git diff <base>...HEAD` | Verdict, summary, findings (`path:line`) | No, chat only   |

Choose local when `gh pr list --head <branch>` finds no PR, or the user says pre-PR, fix first, no GitHub post, or chat only. No PR is never a reason to stop.

A PR can also be reviewed locally. When the user asks for a local review of a PR number or URL, use the PR diff from `gh pr diff` and the local steps below, and never post. Local mode posts nothing, even when a PR exists.

## Format and wording

Write for a reader new to this code. Each comment must make sense on one read, without opening other files.

### Wording

- Normal sentences, with a capital letter and a full stop
- Short, common words. One idea per sentence. One to three sentences per paragraph
- Say what is wrong, then why it matters, then what to do
- Explain a project term the first time, in plain words. Example: "the outbox (the table of messages waiting to be sent)"
- Put paths, symbols, commands and API names in backticks. Never reword them
- No report voice ("This PR exhibits…", "It is recommended that…")
- No em dashes, semicolons, or arrows as grammar
- Ask a question only when you need the author's answer

### Top comment template

Leave out any section with no items.

````markdown
## Review summary

One or two sentences: the verdict and the main reason.

### What I checked

- Scope: `<branch or PR>` against `<base>`, <n> files.
- References: <n> of <n> code references matched the review head.
- Tests: <the exact commands you ran, or "not run: docs only">.

### Must fix before merge

1. `path:line`: what is wrong, in one sentence. Fix: what to do, in one sentence.

### Should fix

1. `path:line`: what is wrong. Fix: what to do.

### What went well

- One short, specific point.
````

### Inline comment template

````markdown
**Blocker:** What is wrong, in one or two sentences.

**Why it matters:** The effect on users, data, or the next change. Blocker and major only.

**Fix:** What to do. If there are two valid options, name both and ask which one to build.
````

- Severity labels: `**Blocker:**`, `**Major:**`, `**Minor:**`, `**Nit:**`
- Minor and nit comments can be one paragraph
- In the GitHub JSON `body`, join parts with `\n\n`

### Findings table

A short index. The full wording goes in the comments under it.

- Columns: `#`, `Severity`, `Location`, `Finding`. Pad columns so pipes line up
- `Finding` is at most 12 words, with no backticks or links. `Location` is one `path:line`
- Order by severity (blocker first), then by path

````markdown
| #   | Severity | Location             | Finding                                |
| --- | -------- | -------------------- | -------------------------------------- |
| 1   | Blocker  | `src/api/hooks.ts:42` | Webhook has no way to find the tenant |
| 2   | Major    | `docs/tdd-x.md:97`   | Signing text and example body disagree |
````

After the table, show each inline comment exactly as it will be posted, under `#### N. path:line`.

### Doc section references

When you point at a place in a design doc, cite the section heading (and number, when the doc numbers sections): `in **3. Webhook signing**`. Never use `§` or a bare number. For a contradiction, name both headings: `You say X in **A** but Y in **B**. Which should we build?`

## Review action (`event`)

| `event`           | When                                                            |
| ----------------- | --------------------------------------------------------------- |
| `REQUEST_CHANGES` | Default, unless the user chose otherwise                    |
| `COMMENT`         | The user asked for feedback only, with no verdict               |
| `APPROVE`         | The user explicitly asked to approve, and findings allow it |

Never approve only because the diff looks clean. "No findings" still defaults to `REQUEST_CHANGES` with a short note, or `COMMENT` if the user asked for comment only.

## Workflow

1. Resolve target (PR or local scope) and HEAD SHA
2. Fetch metadata and diff
3. Orient in the touched code
4. Analyse (optionally with one review subagent)
5. Verify every finding against the review head
6. Draft verdict, top comment and findings table
7. PR mode only: posting gate, then submit and verify

### 1. Resolve target

PR mode:

```bash
gh pr view <target> --json number,title,body,baseRefName,headRefName,headRefOid,url,files,additions,deletions,author
gh pr diff <target>
```

Local mode:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
```

| User intent            | Diff command                        |
| ---------------------- | ----------------------------------- |
| Uncommitted only       | `git diff` and `git diff --cached`  |
| Branch vs default base | `git diff origin/main...HEAD`       |
| Named base             | `git diff <base>...HEAD`            |

Record `headRefOid` or `HEAD`. GitHub needs it as `commit_id` when you post.

### 2. Orient

Read the changed files in full, plus the callers, callees and types they touch. Use a code graph or index tool when the repo has one. For a docs-only PR, still check every code reference the doc cites.

### 3. Analyse

Review for correctness first, then security, data safety, performance, tests, and readability. For a large diff, you may launch one review subagent with the diff, the file list, and the Format and wording rules, and ask it for findings with path, line, severity and body.

Always spot-check subagent findings yourself with Read or Grep. Never post an unverified line number or an invented path.

### 4. Classify findings

| Severity    | Meaning                                         | Where                 |
| ----------- | ----------------------------------------------- | --------------------- |
| Blocker | Must fix before merge                           | Top comment and inline |
| Major   | Important gap, bug, inaccuracy or contradiction | Top comment and inline |
| Minor   | Clarity, ops or test gap                        | Usually inline only   |
| Nit     | Style or wording                                | Usually inline only   |

### 5. Draft

Present in chat:

1. Planned GitHub action (default `REQUEST_CHANGES`) with a one-line reason
2. Top comment, from the template
3. Findings table and every inline comment

PR mode posting gate. Ask in one message:

1. Should I post this review on GitHub, keep it local (chat only), or post it as `COMMENT` or `APPROVE` instead of the planned `REQUEST_CHANGES`?

If they say post without naming an action, use `REQUEST_CHANGES`. If they choose local, or decline, stop after the draft and post nothing.

Local mode: state the would-be verdict and end with next steps: apply the fixes, run focused tests, then open the PR.

### 6. Submit (PR mode, after confirmation)

```bash
gh api repos/{owner}/{repo}/pulls/{number}/reviews --input - <<'EOF'
{
  "commit_id": "<headRefOid>",
  "event": "REQUEST_CHANGES",
  "body": "<top comment markdown>",
  "comments": [
    {
      "path": "src/api/hooks.ts",
      "line": 42,
      "side": "RIGHT",
      "body": "**Blocker:** The webhook body has no tenant ID, so we cannot tell which account it belongs to.\n\n**Why it matters:** Any payload could be saved against the wrong account.\n\n**Fix:** Read the tenant from the signed header, or add it to the payload. Which one should we build?"
    }
  ]
}
EOF
```

- `side: "RIGHT"` for added or changed lines
- One inline comment per distinct finding
- If a line is not in the diff, re-read the file at the PR head, fix the line number, and retry once

### 7. Verify and report

```bash
gh api repos/{owner}/{repo}/pulls/{number}/comments \
  --jq '.[] | select(.pull_request_review_id == <review_id>) | {line, path, body: .body[0:60]}'
```

End with the review URL, the count of inline comments, the compact findings table, and a pointer to `address-the-elephant` for the author.

## Docs-only PRs

- Do not claim tests, type checks or lint passed. They do not apply
- Verify every cited path, line and symbol against the current code
- For design docs, flag the same term used two ways, "required" versus a default, inclusive versus exclusive ranges, claims in the PR body that the doc does not make, and sections that contradict each other
- An internal contradiction or undefined behaviour is major (or blocker if it blocks the build). Wording-only issues are minor or nit

## Guardrails

- Never approve or merge unless the user explicitly asks
- Never post without the user's confirmation. Local mode never posts
- Never invent paths or line numbers
- Report only the tests you actually ran
- Never include secrets in review comments
- Do not fix findings or push code unless the user asks for that next
