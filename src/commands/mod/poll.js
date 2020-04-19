// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const log = console.log;
const chalk = require('chalk');
// Code for the command
module.exports = class pollCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'poll',
      // other ways to call the command, must be in lowercase
      aliases: ['decide'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'poll',
      // Is the description used for 'help' command
      description: 'Poll command to get options',
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
      userPermissions: ['MANAGE_MESSAGES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }
  // Run code goes here
  async run(message) {
    // using client commands there needs to be 'this.'
    // Seprating the message into 'cmd' and 'args'
    let messageArry = message.content.split(" ");
    let args = messageArry.slice(1);
    // Getting the title, text and channel
    var length = args.length;
  	var pos = args.indexOf("|");
  	var title = args.slice(1,pos);
  	var text = args.slice(pos+1,length);
  	if (text.length < 1 && title.length < 1) return message.channel.send("Incorrect Usage!\n`${this.client.commandPrefix}poll [#Channel] [Title] | [Description]`");
    let channelq = message.mentions.channels.first();
  	if(!channelq) return message.channel.send("Incorrect Usage!\n`${this.client.commandPrefix}poll [#Channel] [Title] | [Description]`");

    // setting up the poll emebed
    let pollEmebed = new Discord.RichEmbed()
          .setTitle(title.join(" "))
          .setColor("#4B0082")
          .setDescription("*`"+text.join(" ")+"`*");



    channelq.send("@everyone")
      .then(msg => {
        msg.delete({ timeout: 100000 })
      })
    channelq.send(pollEmebed)
      .then(function (message) {
            message.react("👎")
            message.react("👍")
         })
      message.delete().catch(O_o=>{})
        .then(message.channel.send(`Poll has been posted in ${channelq}!`))
  }

};
