const fs = require("fs");
require("colors");

module.exports = (client) => {
  const commandsArray = [];

  const folders = fs.readdirSync(`./src/commands`);
  for (const folder of folders) {
    const files = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`);

      client.commands.set(command.data.name, command);

      commandsArray.push(command.data.toJSON());

      continue;
    }
  }

  console.log(`🔁 Registering Commands...`.yellow);

  client.application.commands.set(commandsArray);

  console.log(`✅ Registered Commands.`.green);
};
