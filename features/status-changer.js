module.exports = (client) => {

    const statusOptions = ['with terabytes of data','Minecraft','with fire','with your feelings :)','dead,there\'s a bear near','www.blazingcold.com','with time travel','with server settings']
    const rstatus = () => statusOptions[Math.floor(Math.random() * statusOptions.length)];
    let counter = 0;

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: rstatus()
                }
            ]
        })

        if (++counter >= statusOptions.length){
            counter = 0
        }
        setTimeout(updateStatus, 1000 * 60 * 240)
    }
    updateStatus()

}
module.exports.config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer'
}