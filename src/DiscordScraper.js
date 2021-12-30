const { Client, Intents } = require("discord.js");
const { DatabaseService } = require("./service/DatabaseService");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const DB_URL = process.env.DB_URL;

client.login(BOT_TOKEN);
const databaseService = new DatabaseService(DB_URL);

const channelsScrapped = [];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}`);
});

client.on("messageCreate", async (message) => {
  if (
    message.author.username === "raulito" &&
    message.content === "!unwrapped scrape channel"
  ) {
    await databaseService.createConnection();
    // fetch messages
    if (!channelsScrapped.includes(message.channelId)) {
      console.log(`channelID: ${message.channelId} not scraped. Scrapping...`);
      channelsScrapped.push(message.channelId);

      const messageManager = message.channel.messages;
      let nextSnowflake = message.id;
      let channelProcessed = false;
      let channelMessagesSize = BigInt(0);

      while (!channelProcessed) {
        console.log(`Processing Messages ending at snowflake ${nextSnowflake}`);
        const messages = await messageManager.fetch({
          limit: 100,
          before: nextSnowflake,
        });

        channelMessagesSize += BigInt(messages.size);

        console.log(
          `Successful fetching of ${messages.size} messages with ending snowflake at ${nextSnowflake}, current count at ${channelMessagesSize}`
        );

        if (messages.size === 0) {
          channelProcessed = true;
          console.log(
            `finished processing messages for channelID: ${message.channelId}`
          );
          message.reply(`finished storing ${channelMessagesSize}`);
        } else {
          for (let [id, message] of messages) {
            console.log(JSON.stringify(message));
            console.log(`Snowflake=${nextSnowflake} messageID=${id}`);
            nextSnowflake =
              BigInt(nextSnowflake) > BigInt(id) ? id : nextSnowflake;
            await databaseService.saveMessage(message);
          }
        }
      }
      await databaseService.closeConnection();
    } else {
      console.log(`channelID: ${message.channelId} already scraped. `);
    }

    // save the messages into a mongo database
  }
});
