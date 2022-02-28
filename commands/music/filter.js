module.exports = {
    name: 'filter',
    aliases: ['f'],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send(`Please specify a valid filter to enable or disable ${message.author}\n${actualFilter ? `Filter active ${actualFilter} (${client.config.app.px}filter ${actualFilter} to disable it).\n` : ''}`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send(`This filter doesn't exist ${message.author} Try again ? \n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''} List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), 15000)
        });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send(`This filter ${filter} is now **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** \n*Reminder the longer the music is, the longer this will take.*`).then(msg => {
            setTimeout(() => msg.delete().catch(() => null), client.config.app.dtime)
        });
    },

};