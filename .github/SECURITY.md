# Security Policy

## Reporting a vulnerability

Use GitHub's private vulnerability reporting (the **Report a vulnerability** button on this repository's Security tab) to report security issues confidentially. Please include a description of the issue, steps to reproduce, and any affected versions.

Please do not open a public issue for security problems.

## Scope

This is a client-side Obsidian plugin. It makes no network requests, collects no telemetry, and reads no files outside the user's vault.

In scope:

- Injection or unsanitized rendering of pasted DNGNGEN content (the plugin treats pasted generator text as untrusted input and builds all DOM nodes with `textContent`).
- Anything that would let a crafted code block or paste execute code or exfiltrate vault data.

Out of scope:

- Vulnerabilities in Obsidian itself or in the DNGNGEN generator; report those to their respective maintainers.
- Issues requiring a malicious plugin already installed in the vault.

## Supported versions

Only the latest release receives security fixes.
