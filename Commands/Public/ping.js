const { ChatInputCommandInteraction, Client, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription(`Get the bots Ping`),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        
        let e;

        if (client.ws.ping <= 185) {
            e = `🟢`;
        } else if (client.ws.ping <= 250) {
            e = `🟠`;
        } else {
            e = `🔴`;
        }


        interaction.reply({ content: "Calculating Ping..." })
        interaction.fetchReply().then(reply => {
            let ping = reply.createdTimestamp - interaction.createdTimestamp;

            let f;

            if (ping <= 185) {
                f = `🟢`;
            } else if (ping <= 250) {
                f = `🟠`;
            } else {
                f = `🔴`;
            }

            interaction.editReply({
                content: "", 
                embeds: [
                    {
                        color: parseInt(client.storage.colors.primary),
                        fields: [{
                            name: "API Speed",
                            value: `${e} | ${client.ws.ping}ms`,
                            inline: true
                        },
                        {
                            name: "Interaction Speed",
                            value: `${f} | ${ping}ms`,
                            inline: true
                        },
                        {
                            name: "Uptime",
                            value: `🔧 | <t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                            inline: true
                        }
                        ]
                    }
                ]
            })
        })
    }
}