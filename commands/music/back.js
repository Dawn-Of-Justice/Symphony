module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author} `).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime);
        });

        if (!queue.previousTracks[1]) return message.channel.send(`I'm sorry, There was no music played before this one ${message.author} `).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime);
        });
        
        await queue.back();

        message.channel.send(`Playing **previous** track`).then( msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime);
        });
    },
};