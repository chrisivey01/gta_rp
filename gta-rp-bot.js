const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./auth.json");

const database = require("./components/database");
const register = require("./components/register");
const clockIn = require("./components/clock-in");
const clockOut = require("./components/clock-out");
const weekly = require("./components/weekly");
const total = require("./components/total");

const cron = require("cron").CronJob;

new cron("0 59 23 * * FRI", () =>{
    let sql = "UPDATE gta_rp SET weekly_hours = 0";
    database.query(sql)
});

client.login(config.token);

client.on("message", async message => {
    if (message.content.startsWith("!register") && message.channel.id === 579428028455714816) {
        register.register(message, database);
    }

    if (message.content.startsWith("!clockin") && message.channel.id === 579428028455714816) {
        clockIn.clockIn(message, database)
    }

    if (message.content.startsWith("!clockout") && message.channel.id === 579428028455714816) {
        clockOut.clockOut(message, database)
    }

    if (message.content.startsWith("!weekly") && message.channel.id === 579428028455714816) {
        weekly.weekly(message, database)
    }

    if (message.content.startsWith("!total") && message.channel.id === 579428028455714816) {
        total.total(message, database)
    }
});
