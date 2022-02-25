Player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

Player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

Player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !==0) return;
    queue.metadata.send(`Started playing ${track.title} in ** ${queue.connection.channel.name}** 🎶`);
});

