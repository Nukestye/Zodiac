const Discord = require('discord.js');
const log = console.log;
const chalk = require('chalk');
const config = require("../../config.json");

module.exports = {
  run: async (oldMessage, newMessage) => {
    let reportchannel = oldMessage.guild.channels.find(x => x.name === config.log_channels.events);
    if(oldMessage.channel == reportchannel) return;
    if(!reportchannel) return console.error(chalk.red("[!] Event Channel cannot be found!"));

    let messageUpdateEmbed = new Discord.RichEmbed()
      .setTitle(oldMessage.author.tag, newMessage.author.avatarURL)
      .setColor(config.colour)
      .setDescription(`${oldMessage.author.tag} updated their message in ${oldMessage.channel.name}.`)
      .addField("Channel", `${oldMessage.channel}`, true)
      .addField("ID", `\`\`\`excel\nUser = ${oldMessage.author.id}\nMessage = ${oldMessage.id}\`\`\``, true)
      .addField("Link", `[Message Link](${newMessage.url})`, true)
      .addField("New", newMessage.embeds == "" ? newMessage.content : `[Embed Link](${newMessage.url})`, true)
      .addField("Previous", oldMessage.embeds == "" ? oldMessage.content : `[Embed Link](${oldMessage.url})`, true)
      .setFooter(`Zodiac | by nukestye`);


    reportchannel.send(messageUpdateEmbed);

  }
}
