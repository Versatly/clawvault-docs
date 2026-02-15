# Content Source Workflow

This folder is the editable source for the OpenClaw/ClawVault runtime docs that are rendered in Fumadocs.

## How publishing works

- Fumadocs builds from `content/docs`.
- Runtime docs are authored in `content-source`.
- `npm run sync:content-source` copies mapped files into `content/docs` before build/deploy.

## Release workflow

1. Edit docs in `content-source`.
2. Run `npm run sync:content-source`.
3. Run `npm run build`.
4. Deploy (`vercel deploy --prod`).

## Changelog policy

`content/docs/(cli)/changelog.mdx` is currently the canonical full history changelog and includes legacy entries.

When adding a new release:
- append the new release block at the top of `content/docs/(cli)/changelog.mdx`
- keep `content-source/changelog.md` aligned as a lightweight source note if needed

This avoids truncating older releases while we keep source and rendered docs aligned.
