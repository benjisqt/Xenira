const fs = require("fs");
require("colors");

module.exports = (client) => {
  const commands = [];

  const folders = fs.readdirSync(`./src/commands`);
  for (const folder of folders) {
    const cmds = fs
      .readdirSync(`./src/commands`)
      .filter((file) => file.endsWith(".js"));

    for (const file of cmds) {
      const cmd = require(`../commands/${folder}/${file}`);

      client.commands.set(cmd.data.name, cmd);

      commands.push(cmd.data.toJSON());

      continue;
    }
  }

  console.log(`🔁 Registering Commands...`.yellow);

  client.application.commands.set(commands);

  console.log(`✅ Registered Commands.`.green);
};
