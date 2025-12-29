const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.prefix = config.prefix;
client.config = config;

require('./src/structure/commandHandler')(client);
require('./src/structure/slashCommandHandler')(client);
require('./src/structure/eventHandler')(client);

client.login(config.token);
client.on('ready', () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
  client.user.setActivity(`${config.prefix}help`, { type: 'LISTENING' });
});
