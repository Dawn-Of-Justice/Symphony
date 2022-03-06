const { Player } = require ('discord-player');
const { Client , Intents } = require ('discord.js');
const WOKCommands = require('wokcommands')
const path = require('path')
const dotenv = require ('dotenv');
dotenv.config();

global.client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
    disableMentions: 'everyone',
});

client.config = require('./config')

global.player = new Player(client, client.config.opt.discordPlayer );

require('./src/loader');
require('./src/events');

client.login(process.env.token);

client.on('ready', () => {
    console.log('Systems online and functioning properly')
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'admin'),
        testServers: client.config.app.serverId ,
    })
})



//process.on("uncaughtException", (error) => { console.log(error) })