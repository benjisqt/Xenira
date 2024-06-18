const { EmbedBuilder } = require("discord.js");

module.exports = (err, client) => {
  const embed = new EmbedBuilder()
    .setTitle(`Xenira Error.`)
    .setDescription(`Sorry, an error has occured.\n\n\`\`\`${err}\`\`\``)
    .setColor("Red")
    .setFooter({
      text: `${client.user.username}`,
      iconURL: `${client.user.displayAvatarURL()}`,
    });

  return embed;
};
