# DNGNGEN Renderer

Render dungeons copied from [DNGNGEN](https://dngngen.makedatanotlore.dev/) as structured tables in Obsidian. DNGNGEN generates dungeons for the MÖRK BORG tabletop role-playing game.

The plugin works locally and does not make network requests, collect telemetry, or read files outside your vault.

## Usage

1. Open DNGNGEN and generate a dungeon.
2. Select **Copy this**.
3. Paste the result into an Obsidian note.
4. Open Reading view to see the rendered dungeon.

The plugin changes DNGNGEN's copied code block marker into a language Obsidian can recognize. Existing blocks can use the following fence directly:

~~~markdown
```🕇DNGNGEN🕇
[pasted DNGNGEN content]
```
~~~

If the copied format is incomplete or no longer matches DNGNGEN, the plugin displays an error instead of rendering partial or misleading content.

## Installation

After the plugin is accepted into the Obsidian Community directory:

1. Open **Settings → Community plugins** in Obsidian.
2. Select **Browse** and search for **DNGNGEN Renderer**.
3. Select **Install**, then **Enable**.

### Manual installation

Download `main.js` and `manifest.json` from the latest GitHub release. Place them in:

```text
<Vault>/.obsidian/plugins/dngngen/
```

Restart Obsidian, then enable **DNGNGEN Renderer** under **Settings → Community plugins**.

## Development

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

`npm run dev` watches the TypeScript source and rebuilds `main.js`. To run all automated checks:

```sh
npm run check
npm audit
```

There are no runtime npm dependencies. The generated `main.js` bundle treats the Obsidian API as external.

## Credits

DNGNGEN was created by Karl Druid. MÖRK BORG is © 2020 Ockult Örtmästare Games and Stockholm Kartell. This project is an independent community integration and is not affiliated with or endorsed by those creators or by Obsidian.

## License

[MIT](LICENSE)
