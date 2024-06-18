const { Client } = require("discord.js");
require("colors");

module.exports = {
  name: "ready",

  /**
   *
   * @param {Client} client
   */

  async execute(client) {
    console.log(`🛜  ${client.user.tag} is online!`.blue);
  },
};
