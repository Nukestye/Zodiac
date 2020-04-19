// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../../config.json');
const chalk = require('chalk');
// Code for the command
module.exports = class lockCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'lock',
      // other ways to call the command, must be in lowercase
      aliases: ['latch'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'lock',
      // Is the description used for 'help' command
      description: 'Lock/unlock the channel',
      // adds cooldowns to the command
      throttling: {
          // usages in certain time x
          usages: 1,
          // the cooldown
          duration: 10,
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ['ADMINISTRATOR'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }
  // Run code goes here
  run(message) {
    // Seprating the message into 'cmd' and 'args'
    let messageArry = message.content.split(" ");
    let args = messageArry.slice(1);

    // finding '@everyone' role
    let everyoneRole = message.guild.roles.find(x => x.name === "@everyone");
    let staffRole = message.guild.roles.find(x => x.name === "Staff");

    if (!staffRole) {
      message.channel.send("Staff role is missing!");
      console.error(chalk.red("[!] [LOCK COMMAND] Staff role is missing!"));
    };
    // making no perms Emebd
    let noPermsEmebd = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setDescription(`${message.author} doesn't have perms to use this command!`);
    // making lock Emebd
    let lockEmbed = new Discord.RichEmbed()
      .setColor(config.colour)
      .setDescription(`${message.channel} has been locked by ${message.author}!`);
    // making unlock Emebd
    let unlockEmbed = new Discord.RichEmbed()
      .setColor(config.colour)
      .setDescription(`${message.channel} has been unlocked by ${message.author}!`);

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(noPermsEmebd);
    if (args == "on") { // turning on the lock mechanism
      message.channel.overwritePermissions(everyoneRole, {
        SEND_MESSAGES: false,
        READ_MESSAGES: true,
        ADD_REACTIONS: false
      });
      message.channel.overwritePermissions(staffRole, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
      });
      message.channel.send(lockEmbed);
    } else if (args == "off") { // turning off the lock mechanism
      message.channel.overwritePermissions(everyoneRole, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
        ADD_REACTIONS: true
      });
      message.channel.overwritePermissions(staffRole, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
      });
      message.channel.send(unlockEmbed);
    } else { // if its neither 'on'/'off' then its default to 'on'
      message.channel.overwritePermissions(everyoneRole, {
        SEND_MESSAGES: false,
        READ_MESSAGES: true,
        ADD_REACTIONS: false
      });
      message.channel.overwritePermissions(staffRole, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
      });
      message.channel.send(lockEmbed);
    };

  }

};
