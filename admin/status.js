module.exports = {

    category: 'Configuration',
    description: 'Sets the bots status',
    minArgs: 1,
    expectedArgs: '<status>',

    slash: 'both',
    testOnly: true,

    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            status: 'dnd',
            activities: [
                {
                    name: text,
                },
            ],
        })

        return 'Status Updated'

    },
}