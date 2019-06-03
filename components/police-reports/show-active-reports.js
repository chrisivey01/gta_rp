module.exports = {
  showReports: async (message, database, Discord, channel, server, client) => {
    const sql = "SELECT * FROM police_reports WHERE active = 1";
    const results = await database.query(sql);

    if (channel) {
      if (results.length > 0) {
        for (let bolo of results) {
          client.guilds
            .get(server)
            .channels.get(channel)
            .send({
              embed: {
                description: "Record # " + bolo.id + ". Reason: " + bolo.reason
              }
            });
        }
        client.guilds
          .get(server)
          .channels.get(channel)
          .send("If your BOLO is resolved do !remove INPUT RECORD NUMBER");
      } else {
        client.guilds
          .get(server)
          .channels.get(channel)
          .send("No active BOLO at this time.");
      }
    } else {
      if (results.length > 0) {
        for (let bolo of results) {
          message.channel.send({
            embed: {
              description: "Record # " + bolo.id + ". Reason: " + bolo.reason
            }
          });
        }

        message.channel.send(
          "If your BOLO is resolved do !remove INPUT RECORD NUMBER"
        );
      } else {
        message.channel.send("No active BOLO at this time.");
      }
    }
  }
};
