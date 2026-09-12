export const CODE_BLOCK_LANGUAGE = "🕇DNGNGEN🕇";
export const SOURCE_FENCE = "```🕇 D N G N G E N 🕇";
export const SEPARATOR = "_________________";

export const SECTION_ROWS = [
	["What brings you here?", "Status", "Imminent danger"],
	["Who or what dwells here now?"],
	["Entrance", "Guarded by", "Distinctive feature"],
	["Room 1", "Room 2", "Room 3", "Room 4"],
] as const;

export interface DungeonSection {
	heading: string;
	content: string;
}

export interface DungeonData {
	name: string;
	attribution: string;
	sections: DungeonSection[];
}

export function normalizeDngngenPaste(text: string): string | null {
	if (!text.includes(SOURCE_FENCE)) {
		return null;
	}

	return text.replace(SOURCE_FENCE, `\`\`\`${CODE_BLOCK_LANGUAGE}\n`);
}

export function parseDungeon(source: string): DungeonData | null {
	const parts = source.split(SEPARATOR);
	if (parts.length < 3) {
		return null;
	}

	const attribution = parts[1]?.trim();
	const dungeonText = parts.slice(2).join(SEPARATOR).trim();
	if (!attribution || !dungeonText) {
		return null;
	}

	const headings = SECTION_ROWS.flat();
	const firstHeading = headings[0];
	if (!firstHeading) {
		return null;
	}

	const firstHeadingIndex = dungeonText.indexOf(firstHeading);
	if (firstHeadingIndex <= 0) {
		return null;
	}

	const name = dungeonText.slice(0, firstHeadingIndex).trim();
	if (!name) {
		return null;
	}

	const sections: DungeonSection[] = [];
	let searchFrom = firstHeadingIndex;

	for (let index = 0; index < headings.length; index += 1) {
		const heading = headings[index];
		if (!heading) {
			return null;
		}

		const headingIndex = dungeonText.indexOf(heading, searchFrom);
		if (headingIndex < 0) {
			return null;
		}

		const contentStart = headingIndex + heading.length;
		const nextHeading = headings[index + 1];
		const contentEnd = nextHeading
			? dungeonText.indexOf(nextHeading, contentStart)
			: dungeonText.length;

		if (contentEnd < 0) {
			return null;
		}

		sections.push({
			heading,
			content: dungeonText.slice(contentStart, contentEnd).trim(),
		});
		searchFrom = contentEnd;
	}

	return { name, attribution, sections };
}
