const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const ConstructError = require("../../utils/ConstructError");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      ConstructError(`That command is outdated or does not exist.`, client);
    }

    if (command.disabled === true) {
      ConstructError(
        `This command has been globally disabled by the bot owner.`,
        client
      );
    }

    try {
      await command.execute(interaction, client);
    } catch (err) {
      return ConstructError(`${err}`, client);
    }
  },
};
