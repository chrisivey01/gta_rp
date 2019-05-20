module.exports = {
    weekly: async (message, database, table) => {
        const sql = "SELECT * from "+ table +" WHERE weekly_hours IS NOT NULL";
        const results = await database.query(sql);
        try {
            for (let player of results) {
                message.channel.send({
                    "embed": {
                        "description":
                            "** Name: **" + "<@" + player.discord_uid + ">" +
                            "** Hours: **" + player.weekly_hours
                    }
                });
            }
        }catch(err){
            console.log(err)
        }
        console.log(results)
    }
};