const { Player } = require ('discord-player');
const { Client , Intents } = require ('discord.js');
const WOKCommands = require('wokcommands')
const path = require('path')
const dotenv = require ('dotenv');
const mongoose = require('mongoose')
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

client.on('ready', async () => {
 
    console.log('Systems online and functioning properly')
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'admin'),
        featuresDir: path.join(__dirname, 'features'),
        testServers: client.config.app.serverId ,
        botOwners: ['442504496979902464'] ,
        mongoUri: process.env.MONGO_URI,
    })
})



process.on("uncaughtException", (error) => { console.log(error) })