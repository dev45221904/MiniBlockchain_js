# Mini Blockchain (JS)

A simple blockchain built from scratch in JavaScript to understand the core mechanics of Web3: hashing, mining, and chain validation.

Built as part of the Blockchain Technology track at [Decode Labs](https://www.decodelabs.tech).

## Features
- 🔗 Block linking via SHA-256 hashes
- ⛏️ Proof of Work mining (adjustable difficulty)
- 🛡️ Chain validation with tamper detection

## Run it

```bash
node index.js
```

## What it does
Mines a few blocks, validates the chain (should return `true`), then tampers with a block's data and validates again (should return `false`) — proving the chain's immutability.

## Tech
Node.js, built-in `crypto` module — no external dependencies.