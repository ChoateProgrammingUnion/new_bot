const {Client} = require("discord.js");

async function dmJoin(client) {

    client.on("guildMemberAdd", async member => {

        const dmChannel = await member.createDM();

        await dmChannel.send(
            "Welcome to CPU! Please type your full name."
        );

        const filter = msg => msg.author.id === member.id;
        const collector = dmChannel.createMessageCollector({ filter, time: 60000 });

        collector.on("collect", async message => {

            await member.setNickname(message.content);
            await message.reply(`Your nickname has been set to: ${message.content}`);

            collector.stop();
        });

        collector.on("end", (collected, reason) => {
            if (reason === "time") {
                dmChannel.send("You didn't respond in time. If you'd like to set your nickname, please use the 'change_nick' command in the server.");
            }
        });

    });
}


module.exports = { dmJoin }