module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No musics currently playing ${message.author}`).then (msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        if (!queue.tracks[0]) return message.channel.send(`No music in this queue to play after the current one ${message.author}`).then (msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        await queue.clear();

        message.channel.send(`The queue has just been cleared`).then (msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });
    }
}