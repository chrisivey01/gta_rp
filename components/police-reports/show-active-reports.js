module.exports = {
  showReports: async (message, database, Discord, channel, server, client) => {
    const sql = "SELECT * FROM police_reports WHERE active = 1";
    const results = await database.query(sql);

    if (channel) {
      if (results.length > 0) {
        for (let bolo of results) {
          const currentTime = new Date();
          const timestampDb = bolo.time_stmp.getTime();
          const msHours = currentTime.getTime() - timestampDb;
          console.log(currentTime.getTime())
          console.log(timestampDb)
          const time = destructMS(msHours);
          client.guilds
            .get(server)
            .channels.get(channel)
            .send({
              embed: {
                description:
                  "Record # " +
                  bolo.id +
                  ". Reason: " +
                  bolo.reason +
                  " ----  Active " +
                  time.d +
                  " days " +
                  time.h +
                  " hours " +
                  time.m +
                  " minutes " +
                  time.s +
                  " seconds."
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
          let currentTime = new Date();
          let timestampDb = bolo.time_stmp.getTime();
          let msHours = timestampDb - currentTime.getTime();
          console.log(currentTime.getTime())
          console.log(timestampDb)
          let time = destructMS(msHours);
          message.channel.send({
            embed: {
              description:
                "Record # " +
                bolo.id +
                ". Reason: " +
                bolo.reason +
                " ----  Active " +
                time.d +
                " days " +
                time.h +
                " hours " +
                time.m +
                " minutes " +
                time.s +
                " seconds."
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
  },

  destructMS: milli => {
    if (isNaN(milli) || milli < 0) {
      return null;
    }

    let d, h, m, s, ms;
    s = Math.floor(milli / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    ms = Math.floor((milli % 1000) * 1000) / 1000;
    return { d: d, h: h, m: m, s: s, ms: ms };
  }
};
