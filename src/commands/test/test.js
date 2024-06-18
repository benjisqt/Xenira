const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} = require("discord.js");

module.exports = {
  devOnly: true,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    return interaction.reply({
      content: `Pong! ${client.ws.ping}ms to Discord.`,
    });
  },
};
