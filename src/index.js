const { GatewayIntentBits, Client, Collection } = require("discord.js");
require("dotenv").config();
const cmdhandler = require("./utils/command-handler");
const eventhandler = require("./utils/event-handler");
const process = require("node:process");

const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
  ],
});

client.commands = new Collection();
client.snipes = new Map();

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection At:", promise, "reason:", reason);
});

process.on("uncaughtException", (reason, promise) => {
  console.log("Uncaught Exception At:", promise, "reason:", reason);
});

process.on("uncaughtExceptionMonitor", (reason, promise) => {
  console.log("Uncaught Exception Monitor At:", promise, "reason:", reason);
});

client.login(process.env.TOKEN).then(() => {
  cmdhandler(client);
  eventhandler(client);
});
