const { ButtonInteraction, Client } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        if (!interaction.isButton) return;
        
        if (interaction.isButton()) {
            var cmd = client.Buttons.get(interaction.customId);
            if (cmd)
                if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
                    const UserNoPerms = new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(
                            `You Require **${cmd.userPermissions}** to use this button`
                        );
                    return interaction.reply({
                        embeds: [UserNoPerms],
                        ephemeral: true,
                    });
                } else if (
                    !interaction.guild.members.me.permissions.has(cmd.botPermissions || [])
                ) {
                    const BotNoPerms = new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(
                            `I Require **${cmd.botPermissions}** to execute this interaction`
                        );

                    return interaction.reply({
                        embeds: [BotNoPerms],
                        ephemeral: true,
                    });
                } else {
                    cmd.execute(interaction, client);
                }
        }
    }
}