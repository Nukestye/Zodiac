// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando');
const { RichEmbed } = require("discord.js");
const chalk = require('chalk');
const log = console.log;

// Code for the command
module.exports = class unmuteCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'unmute',
      // other ways to call the command, must be in lowercase
      aliases: ['unmute', 'untempmute'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'unmute',
      // Is the description used for 'help' command
      description: 'unmutes the mentioned user',
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
    let messageArry = message.content.split(" ");
    let args = messageArry.slice(1);


    let mUser = message.guild.member(message.mentions.users.first() || message.guild.get(args[0]));
    if(!mUser) return message.channel.send("User cannot be found!");
    let mReason = args.join(" ").slice(22);

    // setting up the embed for report/log
    let unmuteEmbed = new RichEmbed()
      .setDescription(`Report: ${mUser} UNMUTE`)
      .addField("Reason >", `${mReason}`)
      .addField("Time", message.createdAt)


    let reportchannel = message.guild.channels.find(`name`, "report");
    if(!reportchannel) return message.channel.send("*`Report channel cannot be found!`*");


    // Delete the message command
    message.delete().catch(O_o=>{});
    let muterole = message.guild.roles.find('name', `Muted`);
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: 'Muted',
          color: '@000000',
          permissions:[]
        });
        message.guild.channels.forEach(async (channel, id)=> {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        log(chalk.underline.red(e.stack));
      }
    }
    await (mUser.removeRole(muterole.id));
    reportchannel.send(unmuteEmbed);
    // Logs the kick into the terminal
    log(chalk.red('UNMUTE', chalk.underline.bgBlue(mUser) + '!'));
  }

};
