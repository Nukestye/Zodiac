const Discord = require('discord.js');
const log = console.log;
const chalk = require('chalk');
const { Permissions } = require("discord.js")
const config = require("../../config.json");

module.exports = {
  run: async(role) => {
    let reportchannel = role.guild.channels.find(x => x.name === config.log_channels.events);
    if(!reportchannel) return console.error(chalk.red("[!] Event Channel cannot be found!"));

    let roleEmbed = new Discord.RichEmbed()
      .setTitle(`${role.name}`)
      .setColor(config.colour)
      .setDescription(`${role.name} has been removed`)
      .addField("Name", `${role.name}`, true)
      .addField("Date", `${role.createdAt}`, true)
      .addField("ID", `\`\`\`excel\nRole - ${role.id}\`\`\``, true)
      .addField("Mentionable", `${role.mentionable}`, true)
      .addField("Permissions", `\`${checkPerm(role)}\``)
      .setFooter(`CelestialKing#4781 | by nukestye`);

    reportchannel.send(roleEmbed);
  }
};

function checkPerm(role) {
  let crole = role;
  const perms = new Permissions(crole.permissions);
  return perms.toArray();
};
