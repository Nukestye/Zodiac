const Discord = require('discord.js');
const log = console.log;
const chalk = require('chalk');
const config = require("../../config.json");

module.exports =  {
  run: async (message) => {
    let reportchannel = message.guild.channels.find(x => x.name === config.log_channels.events);
    if(message.channel == reportchannel) return;
    if (!reportchannel) console.error(chalk.red("[!] Event Channel cannot be found!"));
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
    let user;
    if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000) && entry.extra.count >= 1)) {
      user = entry.executor.username
    } else {
      // When all else fails, we can assume that the deleter is the author.
      user = message.author.username
    }

    let messageRemoveEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(config.colour)
        .setDescription(`Message deleted in ${message.channel}`)
        .addField("Content", message.embeds == "" ? message.content : `[Embed Link](${message.url})`, true)
        .addField("By", `${user}`, true)
        .addField("ID", `\`\`\`excel\nUser = ${message.author.id}\nMessage = ${message.id}\`\`\``, true)
        .addField("Date",`${message.createdAt}`)
        .setFooter(`Zodiac | by nukestye`);

    reportchannel.send(messageRemoveEmbed);
    //log(chalk.red("MESSAGE DELETE"), chalk.underline(message.author, message));
  }
};
