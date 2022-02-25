client.config = require('../config')

module.exports = ( client, message ) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commands = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.include(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member._roles.includes(roleDJ.id)) {
            return message.channel.send(`This command is available for members with the ${DJ.roleName} role`).then(msg => {
               setTimeout(() => msg.delete(), client.config.app.dtime) 
            });
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voiceChannel) return message.channel.send(`You're not in a voice channel ${message.author}`).then(msg => {
            setTimeout(() => msg.delete(), client.config.app.dtime)
        });

        if (member.guild.me.voiceChannel && message.member.voiceChannel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You're not in the same voice channel ${message.author}`).then(msg => {
            setTimeout(() => msg.delete, client.config.app.dtime)
        });
    }

    if (cmd) cmd.execute(client, message, args);

}