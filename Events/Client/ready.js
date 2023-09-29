const { Client, ActivityType } = require("discord.js")
const chalk = require("chalk")
const { LoadCommands } = require("../../Handlers/commands");
const { default: mongoose } = require("mongoose");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        await LoadCommands(client);
        client.user.setActivity({
            name: `${client.guilds.cache.size} Servers`,
            type: ActivityType.Watching
        })

        console.log(
            chalk.yellow("[Client] ") +
            chalk.cyanBright(": ") +
            chalk.whiteBright(`Client Logged in as `) +
            chalk.magenta.bold(`${client.user.tag}`)
        );

    }
}