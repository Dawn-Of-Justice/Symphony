const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}`).then( msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime);
        });

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}, Try again`).then( msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime);
        });

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try{
            if (!queue.connection) await queue.connect (message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author},`).then(msg => {
                setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime);
            });
        }

        await message.channel.send(`Loading your ${res.playlist ? 'playlist ...' : 'track'}`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        const success = queue.setVolume(client.config.app.dvol);

        if (!queue.playing) await queue.play().then( success);
        

    }
}