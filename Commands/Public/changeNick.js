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
        const user = interaction.user.id
        const name = interaction.options.getString('name')
        console.log(user)
        console.log(name)

        const guild = client.guilds.cache.get("426702004606337034");
        console.log(guild)

        // FIX: TypeError: user.setNickname is not a function
        guild.members.cache.get(interaction.user.id).setNickname(name).catch(err => console.log("Something went wrong setting your name!"))

        interaction.reply("Success")
    }
}