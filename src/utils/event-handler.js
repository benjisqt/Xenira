const fs = require("fs");
require("colors");

module.exports = (client) => {
  const events = fs.readdirSync(`./src/events`);

  for (const eventfolder of events) {
    const files = fs
      .readdirSync(`./src/events/${eventfolder}`)
      .filter((file) => file.endsWith(".js"));

    for (const ev of files) {
      const event = require(`../events/${eventfolder}/${ev}`);

      if (event.rest) {
        if (event.once)
          client.rest.once(event.name, (...args) =>
            event.execute(...args, client)
          );
        else
          client.rest.on(event.name, (...args) =>
            event.execute(...args, client)
          );
      } else {
        if (event.once)
          client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
      }
    }

    continue;
  }

  console.log(`✅ Loaded Events.`.green);
};
