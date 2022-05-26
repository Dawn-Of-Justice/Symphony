module.exports = {
    app: {
        px: '.',
        dtime: '12000',
        dvol: '65',
        serverId: '497428249882656769,979416285010083880'
        //serverId: '809065434413531197'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1<<25
            }
        }
    }

};