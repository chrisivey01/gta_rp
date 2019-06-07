module.exports = {

    addReports: (message, database, Discord) => {
        const sql = "INSERT INTO pd_cad SET player_name = ?, reason = ?";
        let usersFirstMessage = message.content.split(" ");
        usersFirstMessage.shift();
        const userName = usersFirstMessage[0];
        usersFirstMessage.shift();
        const results = usersFirstMessage.join().replace(/,/g, " ")


        message.channel.send("Are you sure you're wanting to submit this issue to the database?")
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });

        collector.on('collect', message => {
            const userInput = message.content.toLowerCase();
            if(userInput === "yes"){
                message.channel.send("ID: " + userName);
                message.channel.send("Reason: " + results);
                const data = [userName, results]
                
                database.query(sql, data);
            }else{
                message.channel.send("Operation aborted");
            }
        })
    
    }
}