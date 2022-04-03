const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    category: 'Links',
    description: 'Fast travel',
    Permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt }) => {
        const LinkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/805763838997561345')
                  .setLabel('Server IP')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/899615546641895444')
                  .setLabel('Download Minecraft')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/959427552538132540')
                  .setLabel('Commands')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/960052171636887572')
                  .setLabel('Shop Setup')
                  .setStyle('LINK')
            )

        await msgInt.reply({
            content: '**Fast Travel :eyes:**',
            components: [LinkRow]
        })
    }
}