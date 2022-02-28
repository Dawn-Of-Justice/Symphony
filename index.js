const { Player } = require ('discord-player');
const { Client , Intents } = require ('discord.js');
const dotenv = require ('dotenv');
dotenv.config();

global.client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
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
})



process.on("uncaughtException", (error) => { console.log(error) })