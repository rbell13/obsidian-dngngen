import * as assert from "node:assert/strict";
import { test } from "node:test";
import {
	CODE_BLOCK_LANGUAGE,
	SECTION_ROWS,
	SOURCE_FENCE,
	normalizeDngngenPaste,
	parseDungeon,
} from "../parser";

const sectionContents = [
	"Recover a stolen icon.",
	"Occupied.",
	"The ceiling is collapsing.",
	"A starving cult.",
	"A rusted gate.",
	"Two guards.",
	"Black water runs uphill.",
	"Broken statues.",
	"A flooded crypt.",
	"Fresh claw marks.",
	"A silent altar.",
];

function createSource(): string {
	const sections = SECTION_ROWS.flat()
		.map((heading, index) => `${heading}\n${sectionContents[index]}`)
		.join("\n\n");

	return [
		"",
		"_________________",
		"→ A dungeon generator for MÖRK BORG ←\nMÖRK BORG is ©2020 Ockult Örtmästare Games and Stockholm Kartell.",
		"_________________",
		"\nNAGEL-MOR, THE THIRD\n",
		sections,
	].join("\n");
}

test("normalizes the DNGNGEN source fence", () => {
	const clipboardText = `${SOURCE_FENCE}\ncontent\n\`\`\``;

	assert.equal(
		normalizeDngngenPaste(clipboardText),
		`\`\`\`${CODE_BLOCK_LANGUAGE}\n\ncontent\n\`\`\``,
	);
});

test("leaves unrelated clipboard text unchanged", () => {
	assert.equal(normalizeDngngenPaste("ordinary text"), null);
});

test("parses a complete DNGNGEN result", () => {
	const dungeon = parseDungeon(createSource());

	assert.notEqual(dungeon, null);
	if (dungeon === null) {
		return;
	}

	assert.equal(dungeon.name, "NAGEL-MOR, THE THIRD");
	assert.match(dungeon.attribution, /A dungeon generator for MÖRK BORG/);
	assert.equal(dungeon.sections.length, SECTION_ROWS.flat().length);
	assert.deepEqual(
		dungeon.sections.map(({ content }) => content),
		sectionContents,
	);
});

test("preserves separator text inside the final room", () => {
	const dungeon = parseDungeon(`${createSource()}\n_________________\nHidden inscription`);

	assert.notEqual(dungeon, null);
	if (dungeon === null) {
		return;
	}

	assert.match(dungeon.sections.at(-1)?.content ?? "", /Hidden inscription/);
});

test("rejects malformed or incomplete input", () => {
	assert.equal(parseDungeon("not a DNGNGEN result"), null);
	assert.equal(parseDungeon("_________________\ncredit\n_________________\nNAME"), null);
	assert.equal(
		parseDungeon(createSource().replace("Room 4", "Missing room")),
		null,
	);
});
