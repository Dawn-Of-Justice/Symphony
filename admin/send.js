module.exports =  {

    category: 'Configuration',
    description: 'Send a message.',
    Permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    

    slash: 'both',
    testOnly: false,
    guildOnly: true,

    callback: ({ message, interaction, args }) => {
        const channel = (
            message 
            ? message.mentions.channels.first()
             : interaction.options.getChannel('channel'))
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.'
        }

        args.shift();
        const text = args.join(' ')

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'send message',
                epemeral: true,
            })
        }
    }

}