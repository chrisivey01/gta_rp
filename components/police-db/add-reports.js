module.exports = {

    addReports: (message, database, Discord) => {
        // const sql = "INSERT INTO pd_cad SET player_name = ?, reason = ?";
        // let usersFirstMessage = message.content.split(" ");
        // usersFirstMessage.shift();
        // const userName = usersFirstMessage[0];
        // usersFirstMessage.shift();
        // const results = usersFirstMessage.join().replace(/,/g, " ")

        let name;
        let reason;
        message.channel.send("Please type in the citizen's name.")
       
       
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
        collector.on('collect', message => {
            name = message.content.toLowerCase();


            const dataCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
            message.channel.send("Did you mean to type? " + name + " Type yes or no.");
            dataCollector.on('collect', message => {
                if (message.content.toLowerCase() === "yes") {
                    message.channel.send("Insert reason:")


                    const reasonCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
                    reasonCollector.on('collect', message => {
                        reason = message.content;
                        message.channel.send(reason);
                    })
                } else {
                    message.channel.send("this doesnt work!")
                }
            })
        })

    }
}