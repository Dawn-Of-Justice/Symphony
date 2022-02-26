const { Client , Intents, Interaction } = require ('discord.js');
const dotenv = require ('dotenv');
const { Player } = require ('discord-player');
dotenv.config();

global.client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.config = require('./config')

global.player = new Player( client, client.config.opt.discordPlayer );

require('./src/events');
require('./src/loader');


client.on('ready', () => {
    console.log('Systems online and functioning properly')
})

client.login(process.env.token)
