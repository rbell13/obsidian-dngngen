import { Plugin } from 'obsidian';


export default class DngngenPlugin extends Plugin {
    async onload() {
      this.registerMarkdownCodeBlockProcessor("DNGNGEN", (source, el, ctx) => {
        const splitByAttribution = source.split("_________________");
        const attribution = splitByAttribution[1]
        const text = splitByAttribution[2]

        const regex = /\b([A-Z ]+)\b/;
        const dngnName: RegExpExecArray | null = regex.exec(text);

        let remainingText: string | null = null;
        if (dngnName) {
            // title
            el.createEl("h2", {text: dngnName[0]});

            const wordIndex: number = dngnName.index || 0;
            remainingText = text.substring(wordIndex + dngnName[0].length).trim();
        }
        
        if (remainingText) {
            const headers = [
                "What brings you here?",
                "Status",
                "Imminent danger",
                "Who or what dwells here now?",
                "Entrance",
                "Guarded by",
                "Distinctive feature",
                "Room 1",
                "Room 2",
                "Room 3",
                "Room 4"
            ];
            const table = el.createEl("table");
            const body = table.createEl("tbody");

            headers.forEach((header) => {
                const escapedHeader = header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`${escapedHeader}\\s*(.+?)(?:\\. |$)`);
                const match = text.match(regex);

                const row = body.createEl("tr");
                if (match) {
                  row.createEl("td", {text: header});
                  row.createEl("td", {text: match[1].trim() + "."});
                }else {
                    const row = body.createEl("tr");
                    row.createEl("td", { text: header });
                    row.createEl("td", { text: "" }); // Add an empty cell if no match is found
                  }
              });
        }
        el.createEl("sub", {text: attribution})
      });
    }
  }
