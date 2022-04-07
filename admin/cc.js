const {MessageAttachment} = require('discord.js');
module.exports = {
    category: 'Moderation',
    description: 'Delete multiple message at once.',

    permission: ['ADMINISTRATOR'],
    requireRoles: true,

    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: 'both',
    testOnly: true,

    callback: async ({ message, interaction, channel, args}) => {

        const amount = args.lenth ? parseInt(args.shift()) : 1

        if (message) {
            await message.delete()
        }

        if (interaction) {
            const snaping = new MessageAttachment('./snap.gif')
            message.channel.send(snaping).then(
                setTimeout(snap, 9000 )
            )
            const { snap } = await channel.bulkDelete(amount+1, true)
        }

    }
}