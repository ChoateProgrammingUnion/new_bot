const {Client} = require("discord.js");

module.exports = {
    name: "changeNick",
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        client.on("guildMemberAdd", member => {    
            console.log(member)
    
            const message = `**Welcome to the server, ${member.id}! Please change your server nickname to your real name by using the change_nick command.`
    
            client.users.send(member.id, message)
        })
    }
}