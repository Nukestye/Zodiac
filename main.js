/*
*
* @author: nukestye
* @version: v1
*
*/

// Look at eric, examples include dankmemerBot
/*
* TODO:
* - Remove the code associated with ZodiacNetwork
* - Implement access to eric framework
* - ![Rename the project!]!
*/



const config = require("./config.json");
const Discord = require("discord.js");
const fs = require('fs');
const chalk = require('chalk');
const app = require("express");
const log = console.log;

// Setting up the way to get commands
const { CommandoClient } = require("discord.js-commando");
const path = require("path");

// reading events
fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const eventFunction = require(`./src/events/${file}`);
    if (eventFunction.disabled) return;
    const event = eventFunction.event || file.split('.')[0];
    const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
    const { once } = eventFunction;
    try {
      emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
    }
    catch (error) {
      console.error(error.stack);
    }
  });
});

const client = global.client = new CommandoClient({
  commandPrefix: `${config.prefix}`,
  owner: `${config.owner}`,
  invite: `${config.discord}`,
  unknownCommandResponse: false
});

// Registing the commands
client.registry
    .registerDefaultTypes()
    // The different fields for cmds
    .registerGroups([
      ['mod', 'Moderation Commands'],
      ['public', 'Public Commands'],
    ])
    .registerDefaultGroups()
    // Basic cmds can be disabled like {'cmd: false'}
    .registerDefaultCommands()
    // commands in '/src/commands' will be counted
    .registerCommandsIn(path.join(__dirname, '/src/commands'));


// list of activities that the bot goes through
let activityArray = [`${config.prefix}help | `];
// Bot lanuch code
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag} in ${client.guilds.size} guild(s)!`);
  setInterval(() => {
      const index = Math.floor(Math.random() * (activityArray.length)); // generates a random number between 1 and the length of the activities array list
      client.user.setActivity(activityArray[index],{ type: "PLAYING"}); // sets bot's activities to one of the phrases in the arraylist.
    }, 5000) // updates every 10000ms = 10s
});
// If an error print it out
client.on('error', console.error);

// Login in using the token in config
client.login(config.token)
