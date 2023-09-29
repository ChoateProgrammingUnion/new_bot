const { ChatInputCommandInteraction, Client, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("change_nick")
        .setDescription(`Change your server nickname`)
        .addStringOption((option) => 
            option.setName('name')
            .setDescription('Your name')
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.user
        const name = interaction.options.getString('name')
        console.log(user)
        console.log(name)

        // FIX: TypeError: user.setNickname is not a function
        user.setNickname(name).catch(err => console.log("Something went wrong setting your name!"))

        interaction.reply("Success")
    }
}