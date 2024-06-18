const { ChatInputCommandInteraction, Client } = require("discord.js");
const developers = require("../../developers.json");
const ConstructError = require("../../utils/ConstructError");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    // checking if command can be ran in chat
    if (!interaction.isChatInputCommand()) return;

    // checking if user is bot
    if (interaction.user.bot) return;

    // checking if command exists
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      const embed = await ConstructError(
        `That command is outdated or does not exist.`,
        client
      );

      return interaction.reply({
        embeds: [embed],
      });
    }

    // checking if command is globally disabled
    if (command.disabled === true) {
      const embed = await ConstructError(
        `This command has been globally disabled by the bot owner.`,
        client
      );

      return interaction.reply({
        embeds: [embed],
      });
    }

    // checking if command is dev only
    if (
      command.devOnly === true &&
      developers.includes(interaction.member.id) === false
    ) {
      const embed = await ConstructError(
        `That command is for developers only.`,
        client
      );

      return interaction.reply({
        embeds: [embed],
      });
    }

    // running command
    try {
      await command.execute(interaction, client);
    } catch (err) {
      const embed = await ConstructError(`${err}`, client);
      return interaction.reply({
        embeds: [embed],
      });
    }
  },
};
