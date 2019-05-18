module.exports = {
    clockIn: async (message, database) => {
        const discord_uid = message.author.id;
        const sql = "SELECT * FROM gta_rp WHERE discord_uid = ?";

        await database.query(sql, discord_uid, (err) => {
            if (err) {
                return message.channel.send("You're not in the database, please !register first.")
            }
            beginClockIn(message, database, discord_uid)
        });
    }
};

beginClockIn = async (message, database, discord_uid) => {

    const currentTime = new Date();
    const currentTimeFormatted = currentTime.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"});

    message.channel.send("You've clocked in at " + currentTimeFormatted + " CST");

    const startClock = [
        currentTime,
        discord_uid
    ];

    const sql = "UPDATE gta_rp SET clock_in = ? WHERE discord_uid = ?";
    await database.query(sql, startClock)
};