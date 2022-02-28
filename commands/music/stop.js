module.exports = {
    name: 'stop',
    aliases: ['s'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        queue.destroy();

        message.channel.send(`Music stopped into this server, see you next time`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });
    },
};