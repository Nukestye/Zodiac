// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando');
const { RichEmbed } = require("discord.js");
const log = console.log;
const chalk = require("chalk");

// Code for the command
module.exports = class banCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'ban',
      // other ways to call the command, must be in lowercase
      aliases: ['ban', 'permban'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'ban',
      // Is the description used for 'help' command
      description: 'Ban command',
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
      userPermissions: ['BAN_MEMBERS'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }
  // Run code goes here
  run(message) {
    let messageArry = message.content.split(" ");
    let args = messageArry.slice(1);


    let bUser = message.guild.member(message.mentions.users.first() || message.guild.get(args[0]));
    if(!bUser) return message.channel.send("User cannot be found!");
    let breason = args.join(" ").slice(22);

    // setting up the embed for report/log
    let banEmbed = new RichEmbed()
      .setDescription(`Report: ${bUser} BAN`)
      .addField("Reason >", `${breason}`)
      .addField("Time", message.createdAt)
      


    let reportchannel = message.guild.channels.find(`name`, "report");
    if(!reportchannel) return message.channel.send("*`Report channel cannot be found!`*");


    // Delete the message command
    message.delete().catch(O_o=>{});
    // Kick the user with reason
    message.guild.member(bUser).ban(breason);
    // sends the ban report into log/report
    reportchannel.send(banEmbed);
    // Logs the ban into the terminal
    log(chalk.red('BAN', chalk.underline.bgBlue(bUser) + '!'));
  }

};
