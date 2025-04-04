import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import chalk from "chalk";
import { marked } from "marked";

// Fix path issues in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NOTES_DIR = path.join(__dirname, "../notes");

// Ensure notes directory exists
fs.ensureDirSync(NOTES_DIR);

export const createNote = async () => {
  const { title, content } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter note title:" },
    {
      type: "editor",
      name: "content",
      message: "Write your note (Markdown supported):",
    },
  ]);

  const notePath = path.join(NOTES_DIR, `${title}.md`);
  await fs.writeFile(notePath, content);
  console.log(chalk.green(`Note "${title}" created successfully!`));
};

export const listNotes = async () => {
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) {
    console.log(chalk.yellow("No notes found."));
  } else {
    console.log(chalk.blue("Your notes:"));
    files.forEach((file) => console.log(`- ${file.replace(".md", "")}`));
  }
};

export const viewNote = async () => {
  const { title } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter note title to view:" },
  ]);

  const notePath = path.join(NOTES_DIR, `${title}.md`);
  if (!(await fs.pathExists(notePath))) {
    console.log(chalk.red("Note not found."));
    return;
  }

  const content = await fs.readFile(notePath, "utf8");
  console.log(chalk.cyan.bold(`\n📖 ${title}\n`));
  console.log(marked(content));
};

export const editNote = async () => {
  const { title } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter note title to edit:" },
  ]);

  const notePath = path.join(NOTES_DIR, `${title}.md`);
  if (!(await fs.pathExists(notePath))) {
    console.log(chalk.red("Note not found."));
    return;
  }

  const { newContent } = await inquirer.prompt([
    { type: "editor", name: "newContent", message: "Edit your note:" },
  ]);

  await fs.writeFile(notePath, newContent);
  console.log(chalk.green(`Note "${title}" updated successfully!`));
};

export const deleteNote = async () => {
  const { title } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter note title to delete:" },
  ]);

  const notePath = path.join(NOTES_DIR, `${title}.md`);
  if (!(await fs.pathExists(notePath))) {
    console.log(chalk.red("Note not found."));
    return;
  }

  await fs.remove(notePath);
  console.log(chalk.green(`Note "${title}" deleted successfully!`));
};

export const searchNotes = async () => {
  const { keyword } = await inquirer.prompt([
    { type: "input", name: "keyword", message: "Enter keyword to search:" },
  ]);

  const files = await fs.readdir(NOTES_DIR);
  const matchingNotes = [];

  for (const file of files) {
    const content = await fs.readFile(path.join(NOTES_DIR, file), "utf8");
    if (content.includes(keyword)) {
      matchingNotes.push(file.replace(".md", ""));
    }
  }

  if (matchingNotes.length === 0) {
    console.log(chalk.red("No matching notes found."));
  } else {
    console.log(chalk.blue("Matching notes:"));
    matchingNotes.forEach((note) => console.log(`- ${note}`));
  }
};
