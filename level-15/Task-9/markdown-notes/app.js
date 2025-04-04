import inquirer from "inquirer";
import chalk from "chalk";
import {
  createNote,
  listNotes,
  viewNote,
  editNote,
  deleteNote,
  searchNotes,
} from "./controllers/notesController.js";

const mainMenu = async () => {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Select an action:",
        choices: [
          "📄 Create a Note",
          "📋 List Notes",
          "🔍 View a Note",
          "✏️ Edit a Note",
          "🗑 Delete a Note",
          "🔎 Search Notes",
          "❌ Exit",
        ],
      },
    ]);

    switch (action) {
      case "📄 Create a Note":
        await createNote();
        break;
      case "📋 List Notes":
        await listNotes();
        break;
      case "🔍 View a Note":
        await viewNote();
        break;
      case "✏️ Edit a Note":
        await editNote();
        break;
      case "🗑 Delete a Note":
        await deleteNote();
        break;
      case "🔎 Search Notes":
        await searchNotes();
        break;
      case "❌ Exit":
        console.log(chalk.green("Goodbye!"));
        process.exit(0);
    }
  }
};

mainMenu();
