const Discord = require('discord.js');
const fs = require('fs');
const Path = require('path');
const config = require("../../config.json");
const chalk = require("chalk");


module.exports = {
  run: async (message) => {
    let guild = message.guild;
    const reportchannel = guild.channels.find(x => x.name === config.log_channels.events); // Unknown Issue happens here for some reason - Issue #001
    if(message.channel.id === reportchannel.id) return;
    if(!reportchannel) return console.error(chalk.red("[!] Event Channel cannot be found!"));


    let messageEmbed = new Discord.RichEmbed()
      .setTitle(message.author.tag, message.author.displayAvatarURL)
      .setColor(config.colour)
      .setDescription(`${message.author.tag} has sent a [message](${message.url}) in ${message.channel}.`)
      .addField("Channel", `${message.channel}`, true)
      .addField("ID", `\`\`\`excel\nUser = ${message.author.id}\nMessage = ${message.id}\`\`\``, true)
      .addField("Content", message.embeds == "" ? message.content : `[Embed Link](${message.url})`)
      .setFooter(`Zodiac | by nukestye`);


    reportchannel.send(messageEmbed);


    // console.log(`${reportchannel.name}\n${message.channel.name}`);
    // message.embeds == "" ? console.log(message.content) : console.log(message.url)

  }
};
