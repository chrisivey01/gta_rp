module.exports = {

    viewReports: async (message, database) => {
        const name = message.content.split(" ")[1];        
        const sql = "SELECT * FROM pd_cad WHERE player_name = ?";
        const results = await database.query(sql, name);
        
        message.channel.send("Found "  + results.length + " results.")
        
    }
}