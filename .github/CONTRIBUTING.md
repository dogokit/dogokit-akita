# Contributing to Dogokit

Thank you for considering to contribute! :tada:

## How to Contribute

Follow these steps:

1. Fork this repository and clone it to your local machine.
2. Create a new branch for your contribution: `git checkout -b BRANCHNAME`
3. Add your changes to the staging area: `git add [path of files]`
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push -u origin BRANCHNAME`
6. Submit a pull request.

## Quick Guide

### Prerequisites

```shell
bun: "latest"
```

### Setting up your local repo

Run `bun install` from the top-level project directory to install all dependencies for `Dogokit`.

```shell
git clone && cd ...
bun install
```

### Setting up environment variables

Create a `.env.local` file in `apps/web` with the variables your local setup needs.

You will also need a GitHub OAuth token and a Google OAuth client for authentication.

### Using GitHub Codespaces for development

To get started, create a codespace for this repository by clicking this 👇

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/dogokit/dogokit-akita)

Your new codespace will open in a web-based version of Visual Studio Code. All development dependencies will be preinstalled, and the tests will run automatically ensuring you've got a green base from which to start working.

### Other useful commands

```shell
# auto-format the entire project
bun run format
```

```shell
# lint the project
bun run lint
```

## Code Style Guidelines

Please follow the existing code style and conventions used in the project.

## Issue Reporting

If you encounter any issues with the project or have suggestions for improvements, please open an issue on the GitHub repository.

**[Dogokit](https://github.com/dogokit/dogokit-akita/issues)**

## License

By contributing to this project, you agree that your contributions will be licensed under the [LICENSE](LICENSE).
