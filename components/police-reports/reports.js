module.exports = {
    reports: async (message, database, Discord) => {
        let name;
        let description;

        let reportArray = message.content.split(" ");
        reportArray.shift();
        name = reportArray[0];
        reportArray.shift();
        description = reportArray.join().replace(/,/g, " ");

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });

        message.channel.send("Is this correct? Type YES or NO");
        message.channel.send("Name:" + name);
        message.channel.send("Description:" + description);

        collector.on('collect', message => {
            if(message.content.toLowerCase() === "yes" ){
                message.channel.send("Processing...")
            }else{
                message.channel.send("Aborting... please resubmit.")
            }
        })
    }
};
      // message.channel.send("Please enter the individuals name: ");
      //
      // const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
      //
      // collector.on('collect', message => {
      //     name = message.content;
      //     message.channel.send("You've entered " + name);
      //
      //     message.channel.send("Please type file, or search database.");
      //
      //     if(message.content === "file"){
      //         message.channel.send("Please insert your report on " + name);
      //
      //     }else if(message.content === "search database"){
      //         message.channel.send("Searching database for reports on " + name +" .... ")
      //
      //     }else{
      //         message.channel.send("Invalid entry....")
      //     }
      // });

      // collector.on('collector', message => {
      //
      // })
//   }
// };


// message.author.send("See or Change?");
// const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
// console.log(collector)
// collector.on('collect', message => {
//     if (message.content == "See") {
//         message.channel.send("You Want To See Someones Spec OK!");
//     } else if (message.content == "Change") {
//         message.channel.send("You Want To Change Your Spec OK!");
//     }
// })