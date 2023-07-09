# Obsidian DNGNGEN (MÖRK BORG) Plugin

This is a plugin for Obsidian (https://obsidian.md).

This is a simple plugin to parse the generated dungeons for the TTRPG [MÖRK BORG](https://morkborg.com/) from [DNGNGEN](https://dngngen.makedatanotlore.dev/) into a nice format for Obsidian. It treats pasted text from the "COPY THIS" button at [DNGNGEN](https://dngngen.makedatanotlore.dev/) as a valid codeblock

## Caveats
Okay, okay, right now it isn't quite as easy as copy/paste. I haven't figured out how to parse the text "🕇 D N G N G E N 🕇" as a language for the code block object...yet! You have to delete that and replace it with DNGNGEN and a newline. :cry:

## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-dngngen/`.