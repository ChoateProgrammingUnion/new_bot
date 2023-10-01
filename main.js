const { Partials, Client, GatewayIntentBits, Collection, ClientPresence, EmbedBuilder, Colors, ButtonInteraction } = require("discord.js");
const { LoadEvents } = require("./handlers/events");
const { dmJoin } = require("./events/DirMessages/nick");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.ThreadMember,
        Partials.User,
    ],
});

client.config = require('./Storage/config.json');
client.storage = require("./storage/clientStorage.json");

client.events = new Collection();
client.commands = new Collection();
client.Buttons = new Collection();

LoadEvents(client);
require("./handlers/buttons")(client);

module.exports = { client };

const buttonHandlers = {};

dmJoin(client);

global.handleButton = (id, cb) => {
    buttonHandlers[id] = cb;
    return { remove: () => delete buttonHandlers[id] };
};

client.on("interactionCreate", i => {
    if (i instanceof ButtonInteraction) {
        if (buttonHandlers[i.customId]) buttonHandlers[i.customId](i, client);
    }
});

client.login(client.config.token); 