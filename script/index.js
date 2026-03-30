const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat,
    ExternalHyperlink, TabStopType, TabStopPosition, UnderlineType
} = require('docx');
const fs = require('fs');

// Color palette
const NAVY = "1B3A6B";
const DARK = "1A1A1A";
const MID = "444444";
const LITE = "666666";
const RULE = "C8D4E8";
const ACCENT_BG = "EEF3FB";

function hRule(color = RULE) {
    return new Paragraph({
        spacing: { before: 0, after: 0 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color, space: 1 } },
        children: []
    });
}

function sectionHeader(text) {
    return new Paragraph({
        spacing: { before: 120, after: 60 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 2 } },
        children: [
            new TextRun({ text: text.toUpperCase(), bold: true, size: 19, color: NAVY, font: "Calibri", characterSpacing: 40 })
        ]
    });
}

function bullet(text) {
    return new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text, size: 18, font: "Calibri", color: DARK })]
    });
}

function spacer(pts = 60) {
    return new Paragraph({ spacing: { before: 0, after: pts }, children: [] });
}

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const doc = new Document({
    numbering: {
        config: [
            {
                reference: "bullets",
                levels: [{
                    level: 0, format: LevelFormat.BULLET, text: "\u2013",
                    alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 360, hanging: 200 } } }
                }]
            }
        ]
    },
    styles: {
        default: { document: { run: { font: "Calibri", size: 18, color: DARK } } }
    },
    sections: [{
        properties: {
            page: {
                size: { width: 11906, height: 16838 }, // A4
                margin: { top: 720, right: 900, bottom: 720, left: 900 }
            }
        },
        children: [

            // ── NAME ──────────────────────────────────────────────────────────────
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
                children: [
                    new TextRun({ text: "GYANA PRAKASH KHANDUAL", bold: true, size: 36, color: NAVY, font: "Calibri", characterSpacing: 80 })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 60 },
                children: [
                    new TextRun({ text: "Full Stack Web Developer", size: 22, color: MID, font: "Calibri", italics: true })
                ]
            }),

            // ── CONTACT BAR ───────────────────────────────────────────────────────
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
                border: {
                    top: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 1 }
                },
                shading: { fill: ACCENT_BG, type: ShadingType.CLEAR },
                children: [
                    new TextRun({ text: "  \u260E  +91 7606939833  ", size: 17, color: MID, font: "Calibri" }),
                    new TextRun({ text: "|  \u2709  gyanaprakashkhandual@gmail.com  ", size: 17, color: MID, font: "Calibri" }),
                    new TextRun({ text: "|  \uD83C\uDF10  gyanprakash.vercel.app  ", size: 17, color: NAVY, font: "Calibri" }),
                    new TextRun({ text: "|  \uD83D\uDC19  github.com/gyanaprakashkhandual  ", size: 17, color: NAVY, font: "Calibri" }),
                ]
            }),
            spacer(80),

            // ── PROFESSIONAL SUMMARY ──────────────────────────────────────────────
            sectionHeader("Professional Summary"),
            new Paragraph({
                spacing: { before: 60, after: 80 },
                children: [
                    new TextRun({
                        text: "Full Stack Web Developer with 1+ year of professional experience building, testing, and deploying end-to-end web applications. Proficient in React, Next.js, Node.js, and MongoDB. Track record of delivering 4 complete production-ready applications at Avidus Interactive. Passionate about AI integrations, developer tooling, and creating intuitive user experiences.",
                        size: 18, color: DARK, font: "Calibri"
                    })
                ]
            }),

            // ── SKILLS ────────────────────────────────────────────────────────────
            sectionHeader("Technical Skills"),
            new Table({
                width: { size: 10106, type: WidthType.DXA },
                columnWidths: [1600, 8506],
                rows: [
                    ["Frontend", "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Material UI"],
                    ["Backend", "Node.js, Express.js, REST APIs"],
                    ["Database", "MongoDB"],
                    ["State Mgmt", "Redux, Context API"],
                    ["Tools & DevOps", "Git, GitHub, Vercel, Render, Jira, Figma, VS Code"],
                ].map(([label, val]) => new TableRow({
                    children: [
                        new TableCell({
                            borders: noBorders,
                            width: { size: 1600, type: WidthType.DXA },
                            margins: { top: 40, bottom: 40, left: 0, right: 80 },
                            children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 17, color: NAVY, font: "Calibri" })] })]
                        }),
                        new TableCell({
                            borders: noBorders,
                            width: { size: 8506, type: WidthType.DXA },
                            margins: { top: 40, bottom: 40, left: 80, right: 0 },
                            children: [new Paragraph({ children: [new TextRun({ text: val, size: 17, color: DARK, font: "Calibri" })] })]
                        })
                    ]
                }))
            }),
            spacer(60),

            // ── EXPERIENCE ────────────────────────────────────────────────────────
            sectionHeader("Work Experience"),
            new Table({
                width: { size: 10106, type: WidthType.DXA },
                columnWidths: [7300, 2806],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                borders: noBorders, width: { size: 7300, type: WidthType.DXA },
                                margins: { top: 60, bottom: 0, left: 0, right: 0 },
                                children: [new Paragraph({
                                    children: [
                                        new TextRun({ text: "Full Stack Web Developer", bold: true, size: 20, color: DARK, font: "Calibri" }),
                                        new TextRun({ text: "  —  Avidus Interactive", size: 19, color: MID, font: "Calibri" })
                                    ]
                                })]
                            }),
                            new TableCell({
                                borders: noBorders, width: { size: 2806, type: WidthType.DXA },
                                margins: { top: 60, bottom: 0, left: 0, right: 0 },
                                children: [new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [new TextRun({ text: "Jan 2020 – Apr 2026", size: 17, color: LITE, font: "Calibri", italics: true })]
                                })]
                            })
                        ]
                    })
                ]
            }),
            bullet("Developed and shipped 4 production web applications end-to-end — from architecture to client handover."),
            bullet("Built scalable full-stack systems using React, Next.js, Node.js, Express, and MongoDB."),
            bullet("Collaborated with design and product teams using Figma and Jira in an agile environment."),
            bullet("Managed CI/CD pipelines and deployments on Vercel and Render."),
            spacer(60),

            // ── PROJECTS ──────────────────────────────────────────────────────────
            sectionHeader("Key Projects"),

            // Project 1
            new Paragraph({
                spacing: { before: 70, after: 30 },
                children: [
                    new TextRun({ text: "Caphetis", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                    new TextRun({ text: "  —  AI-Powered Bug Tracker & VS Code Extension", size: 18, color: MID, font: "Calibri" }),
                    new TextRun({ text: "    caffetest.vercel.app", size: 17, color: NAVY, font: "Calibri", italics: true }),
                ]
            }),
            bullet("VS Code extension that monitors Selenium test runs and syncs results to a live dashboard."),
            bullet("Integrated Anthropic & OpenAI APIs to auto-generate bug reports and test cases from project context."),
            bullet("Full integration with GitHub and Google Docs for seamless developer workflow."),
            spacer(40),

            // Project 2
            new Paragraph({
                spacing: { before: 40, after: 30 },
                children: [
                    new TextRun({ text: "Fetch.Virtual", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                    new TextRun({ text: "  —  AI-Powered API Testing Tool (Postman Alternative)", size: 18, color: MID, font: "Calibri" }),
                    new TextRun({ text: "    fectch.vercel.app", size: 17, color: NAVY, font: "Calibri", italics: true }),
                ]
            }),
            bullet("Connects to GitHub repos via VS Code extension; AI reads backend code and auto-generates API requests."),
            bullet("Runs tests autonomously and produces structured reports and documentation."),
            spacer(40),

            // Project 3 & 4 inline
            new Paragraph({
                spacing: { before: 40, after: 30 },
                children: [
                    new TextRun({ text: "Khandual.Virtual", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                    new TextRun({ text: "  —  Music Collaboration Platform", size: 18, color: MID, font: "Calibri" }),
                    new TextRun({ text: "   |   ", size: 17, color: RULE, font: "Calibri" }),
                    new TextRun({ text: "Toodoo", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                    new TextRun({ text: "  —  Task Management App  (toodoo.vercel.app)", size: 18, color: MID, font: "Calibri" }),
                ]
            }),
            bullet("Khandual.Virtual: Full-stack platform for music collaboration, artist showcasing, and discovery."),
            bullet("Toodoo: Clean React + Node.js to-do application with full CRUD and MongoDB persistence."),
            spacer(60),

            // ── EDUCATION ─────────────────────────────────────────────────────────
            sectionHeader("Education"),
            new Table({
                width: { size: 10106, type: WidthType.DXA },
                columnWidths: [4700, 3000, 2406],
                rows: [
                    ["MCA — Master of Computer Applications", "IGNOU", "Completed"],
                    ["BCA — Bachelor of Computer Applications", "Utkal University", "Completed"],
                    ["Full Stack Web Development", "Masai School", "Completed"],
                ].map(([deg, inst, status]) => new TableRow({
                    children: [
                        new TableCell({
                            borders: noBorders, width: { size: 4700, type: WidthType.DXA },
                            margins: { top: 40, bottom: 40, left: 0, right: 80 },
                            children: [new Paragraph({ children: [new TextRun({ text: deg, bold: true, size: 17, color: DARK, font: "Calibri" })] })]
                        }),
                        new TableCell({
                            borders: noBorders, width: { size: 3000, type: WidthType.DXA },
                            margins: { top: 40, bottom: 40, left: 80, right: 80 },
                            children: [new Paragraph({ children: [new TextRun({ text: inst, size: 17, color: MID, font: "Calibri" })] })]
                        }),
                        new TableCell({
                            borders: noBorders, width: { size: 2406, type: WidthType.DXA },
                            margins: { top: 40, bottom: 40, left: 80, right: 0 },
                            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: status, size: 17, color: LITE, font: "Calibri", italics: true })] })]
                        })
                    ]
                }))
            }),
            spacer(40),
        ]
    }]
});

Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync("/home/claude/resume.docx", buf);
    console.log("Done");
});