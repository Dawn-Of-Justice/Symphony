const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    category: 'Links',
    description: 'Fast travel',
    Permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: false,

    callback: async ({ interaction: msgInt }) => {
        const LinkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/962081730330787840')
                  .setLabel('Server IP')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/962082151015272458')
                  .setLabel('Download Minecraft')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/962082614074818610')
                  .setLabel('Commands')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/962083945363701821')
                  .setLabel('Shop Setup')
                  .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                  .setURL('https://discord.com/channels/497428249882656769/801112790999236698/962348332829782117')
                  .setLabel('Custom Skins')
                  .setStyle('LINK')
            )

        await msgInt.reply({
            content: '**Fast Travel :eyes:**',
            components: [LinkRow]
        })
    }
}