const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute (interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName); 
        if (!command)
            return interaction.reply({
                content: "This command is outdated.", 
                ephemeral: true
            });

        if (command.developer && interaction.user.id !== client.config.DeveloperID)
            return interaction.reply({
                content: "This command is restricted to developers only.",
                ephemeral: true
            });
        
        command.execute(interaction, client); 
    }
}