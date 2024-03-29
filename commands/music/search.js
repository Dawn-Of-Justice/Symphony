const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}, try again !`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}, try again !`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('RANDOM');
        embed.setAuthor(`Results for ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** `);

        embed.setTimestamp();
        embed.setFooter('Made by BlazingCold', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), 15000)
        });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Search cancelled `) && collector.stop().then(msg => {
                setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
            });

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**, try again !`).then(msg => {
                setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
            });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`I can't join the voice channel ${message.author}, try again !`).then(msg => {
                    setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
                });
            }

            await message.channel.send(`Loading your search... 🎧`).then(msg => {
                setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
            });

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`Search timed out ${message.author}, try again !`).then(msg => {
                setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
            });
        });
    },
};