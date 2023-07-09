import { Plugin, Editor } from 'obsidian';
import { EditorView, } from '@codemirror/view'

export default class DngngenPlugin extends Plugin {
    pasteHandler = (evt: ClipboardEvent, editor: Editor) => replaceDNGNGENTextIfPresentInClipboard(editor, evt);

    async onload() {
        this.app.workspace.on("editor-paste", this.pasteHandler);
        this.registerMarkdownCodeBlockProcessor("🕇DNGNGEN🕇", processMarkdownCodeBlock);
    }
}

// main pasteHandle function for replacing codeblock text to make Obsidian parse the codeblock language correctly
export function replaceDNGNGENTextIfPresentInClipboard(editor: Editor, cb:  ClipboardEvent): void {
    if ( cb.clipboardData === null) {
        console.error("empty clipboardData in ClipboardEvent");
        return;
    }
    
    const clipboardText = getCbText(cb);
    if (clipboardText === null) return;

    if (clipboardText.contains("```🕇 D N G N G E N 🕇")){
        cb.preventDefault()
        editor.replaceSelection(clipboardText.replace("```🕇 D N G N G E N 🕇", "```🕇DNGNGEN🕇\n"))
    }
}

// Helper function to get clipboard text from a clipboard event
function getCbText(cb:ClipboardEvent): string | null {
    let clipboardText: string;

    if (cb.clipboardData === null) {
        console.error("empty clipboardData in ClipboardEvent");
    return null;
    } else {
        clipboardText = cb.clipboardData.getData("text");
    }

    return clipboardText.trim();
}



// Helper function to create a header element with text content
function createHeaderElement(tagName: keyof HTMLElementTagNameMap, text: string): HTMLElement {
    const header = document.createElement(tagName);
    header.textContent = text;
    return header;
}

// Helper function to create a paragraph element with text content
function createParagraphElement(text: string): HTMLElement {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
}

// Helper function to escape special characters in a string
function escapeRegexString(str: string): string {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Helper function to create a table with rows and cells
function createTable(headers: string[][], text: string): HTMLTableElement {
    const table = document.createElement("table");
    const body = document.createElement("tbody");
    
    headers.forEach((headerRow, i) => {
        const row = document.createElement("tr");
        headerRow.forEach((header, j) => {
            const col = document.createElement("th");
            col.colSpan = 12 / headerRow.length;

            const escapedHeader = escapeRegexString(header);
            const nextHeader = (j+1 < headerRow.length) ? headers[i][j+1] : (i+1 < headers.length) ? headers[i+1][0]: '';
            const escapedNextHeader = nextHeader ? escapeRegexString(nextHeader) : '\\n';
            const regex = new RegExp(`${escapedHeader}\\s*([\\s\\S]*?)(?=${escapedNextHeader}|${escapedHeader}|$)`, 'u');
            const match = text.match(regex);

            const headerType = "h" + (headerRow.length + 2);
            col.appendChild(createHeaderElement(headerType as keyof HTMLElementTagNameMap, header));
            if (match) {
                col.appendChild(createParagraphElement(match[1].trim()));
            } else {
                col.appendChild(createParagraphElement(""));
            }

            row.appendChild(col);
        });

        body.appendChild(row);
    });

    table.appendChild(body);
    return table;
}

// Main logic for processing the Markdown code block
function processMarkdownCodeBlock(source: string, el: HTMLElement, ctx: any): void {
    const splitByAttribution = source.split("_________________");
    const attribution = splitByAttribution[1];
    const text = splitByAttribution[2];

    const regex = /\b([\p{Lu} ]+)\b/u;
    const dngnName = regex.exec(text);

    let remainingText: string | null = null;
    if (dngnName) {
        el.appendChild(createHeaderElement("h2", dngnName[0]));
        const wordIndex: number = dngnName.index || 0;
        remainingText = text.substring(wordIndex + dngnName[0].length).trim();
    }

    if (remainingText) {
        const headers: string[][] = [
            ["What brings you here?", "Status", "Imminent danger"],
            ["Who or what dwells here now?"],
            ["Entrance", "Guarded by", "Distinctive feature"],
            ["Room 1", "Room 2", "Room 3", "Room 4"]
        ];

        const table = createTable(headers, remainingText); // Use remainingText instead of text
        el.appendChild(table);
    }

    el.appendChild(createHeaderElement("sub", attribution));
}
