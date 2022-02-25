const { readdirSync } = require( 'fs' );
const { Collection } = require( 'discord.js' );
const { dir } = require('console');

client.commands = new Collection();

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`../events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const commands = require(`../commands/${dirs}/${file}`);
        client.commands.set(command.name.toLowerCase(), commands);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    };
});