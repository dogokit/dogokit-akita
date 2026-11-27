# ACP

ACP (Agent Client Protocol) is an open standard that lets a code editor talk to a coding agent. It works like the Language Server Protocol does for language tools: the editor starts a local agent as a subprocess, and they exchange JSON-RPC messages over stdio. Use it so one agent works in many editors without custom code for each pair

## Versions

- v1: the stable version. Its protocol version is `1`, agreed on during `initialize`
- v2: a draft, published July 20, 2026. Parts can still change before it is stable. Gate it behind version negotiation and feature flags, and do not ship it by default. v1 stays supported

What changes in v2:

- Updates can arrive at any time in a session, not only during a turn
- Messages and tool calls are patched by stable IDs
- Text diffs are replaced by structured file changes
- Permission requests carry their own title and description

Official links:

- [ACP](https://agentclientprotocol.com): official site
- [ACP v1 Docs](https://agentclientprotocol.com/protocol/v1/overview): official v1 docs
- [ACP v2 Draft](https://agentclientprotocol.com/announcements/acp-v2-draft.md): official v2 draft announcement
- [ACP GitHub](https://github.com/agentclientprotocol/agent-client-protocol): source code, Apache-2.0 license
