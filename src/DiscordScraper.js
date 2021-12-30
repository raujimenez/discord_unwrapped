const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;

client.login(process.env.JOHN_SHOUT_TOKEN);


client.on('ready', async () => {
    // scrape audit logs
    client.
    // scrape messages

});

