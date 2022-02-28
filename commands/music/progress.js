module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return messsage.channel.send(`Playing a live, no data to display`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        message.channel.send(`${progress} (**${timestamp.progress}**%)`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });
    },
};