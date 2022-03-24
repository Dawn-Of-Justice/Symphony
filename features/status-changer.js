module.exports = (client) => {

    const statusOptions = ['with terabytes of data','Minecraft','with fire','with your feelings :)','dead,there\'s a bear near']
    let counter = 0;

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        })

        if (++counter >= statusOptions.length){
            counter = 0
        }
        setTimeout(updateStatus, 1000 * 60 * 4)
    }
    updateStatus()

}
module.exports.config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer'
}