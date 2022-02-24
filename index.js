const { Client , Intents } = require ('discord.js');
const dotenv = require ('dotenv');
const player = require ('discord-player');
dotenv.config();
client.config = require('./config')

global.client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

global.player = new player( client, client.config.opt.discordPlayer );

client.on('ready', () => {
    console.log('Systems online and functioning properly')
})

client.login(process.env.token)
