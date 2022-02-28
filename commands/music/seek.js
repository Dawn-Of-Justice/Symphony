const ms = require('ms');

module.exports = {
    name: 'seek',
    aliases: [],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}, try again ~`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        const timeToMS = ms(args.join(' '));

        if (isNaN(timeToMS)) return message.channel.send(`Please enter a valid time ${message.author}, \n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...* Currently slight bugged`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        if (timeToMS >= queue.current.durationMS) return message.channel.send(`The indicated time is higher than the total time of the current song ${message.author}, try again ! \n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        await queue.seek(timeToMS);

        message.channel.send(`Time set on the current song **${ms(timeToMS, { long: true })}** `).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

    
    },

    
};