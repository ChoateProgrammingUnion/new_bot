const { Client, REST, Routes } = require("discord.js");
const { loadFiles } = require("../Functions/FileLoader");
const ascii = require("ascii-table");
const chalk = require("chalk")

/**
 * @param {Client} client
 */
async function LoadCommands(client) {

    const table = new ascii().setHeading("Command", "Status");

    await client.commands.clear();

    let CommandsArray = [];

    const Files = await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);

        CommandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "💚");
    });

    client.application.commands.set(CommandsArray);

    return console.log(chalk.whiteBright(table.toString()),
        chalk.blue("\n[Commands] ") +
        chalk.cyanBright(": ") +
        chalk.whiteBright("Loaded Commands.")
    );
}

module.exports = { LoadCommands };