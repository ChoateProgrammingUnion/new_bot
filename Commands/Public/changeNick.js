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

        const guild = client.guilds.cache.get("889411465491124304");
        console.log(guild)

        const guildMember = guild.members.cache.get(interaction.user.id);

        if (guildMember) {

            const addedNickname = await guildMember.setNickname(name);

            if (addedNickname) {
                interaction.reply("Success");
            } else {
                console.log("Failed to add nickname.");
            }

        } else {
            console.log("User is not a member of this guild.");
        }

    }
}