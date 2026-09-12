import { MarkdownPostProcessorContext, Plugin } from "obsidian";
import {
	CODE_BLOCK_LANGUAGE,
	DungeonData,
	SECTION_ROWS,
	normalizeDngngenPaste,
	parseDungeon,
} from "./parser";

export default class DngngenPlugin extends Plugin {
	onload(): void {
		this.registerEvent(
			this.app.workspace.on("editor-paste", (event, editor) => {
				if (event.defaultPrevented) {
					return;
				}

				const replacement = getPasteReplacement(event);
				if (replacement === null) {
					return;
				}

				editor.replaceSelection(replacement);
				event.preventDefault();
			}),
		);
		this.registerMarkdownCodeBlockProcessor(
			CODE_BLOCK_LANGUAGE,
			(source, element, context) => renderDungeon(source, element, context),
		);
	}
}

export function getPasteReplacement(event: ClipboardEvent): string | null {
	const clipboardText = event.clipboardData?.getData("text/plain");
	if (!clipboardText) {
		return null;
	}

	return normalizeDngngenPaste(clipboardText);
}

export function renderDungeon(
	source: string,
	element: HTMLElement,
	_context: MarkdownPostProcessorContext,
): void {
	const dungeon = parseDungeon(source);
	if (dungeon === null) {
		element.createEl("p", {
			cls: "dngngen-error",
			text: "This dngngen block could not be parsed. Paste a complete result from the dngngen generator.",
		});
		return;
	}

	renderParsedDungeon(element, dungeon);
}

function renderParsedDungeon(element: HTMLElement, dungeon: DungeonData): void {
	element.addClass("dngngen");
	element.createEl("h2", { text: dungeon.name });

	const table = element.createEl("table");
	const body = table.createEl("tbody");
	let sectionIndex = 0;

	for (const sectionRow of SECTION_ROWS) {
		const row = body.createEl("tr");
		for (let columnIndex = 0; columnIndex < sectionRow.length; columnIndex += 1) {
			const section = dungeon.sections[sectionIndex];
			if (!section) {
				return;
			}

			const cell = row.createEl("td");
			cell.colSpan = 12 / sectionRow.length;
			cell.createEl(`h${sectionRow.length + 2}` as keyof HTMLElementTagNameMap, {
				text: section.heading,
			});
			cell.createEl("p", { text: section.content });
			sectionIndex += 1;
		}
	}

	element.createEl("small", {
		cls: "dngngen-attribution",
		text: dungeon.attribution,
	});
}
