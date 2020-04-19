const Discord = require('discord.js');
const log = console.log;
const chalk = require('chalk');
const { Permissions } = require("discord.js")
const config = require("../../config.json");

module.exports = {
  run: async (oldRole, newRole) => {
    let reportchannel = oldRole.guild.channels.find(x => x.name === config.log_channels.events);
    if(!reportchannel) return console.error(chalk.red("[!] Event Channel cannot be found!"));

    const entryNew = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
    const entryOld = await oldRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
    let user;
    if ((entryNew.target.id === entryOld.target.id)) {
      user = entryNew.executor.username
    } else {
      // When all else fails, we can assume that the deleter is the author.
      user = message.author.username
    };


    let roleUpdateEmbed = new Discord.RichEmbed()
      .setTitle(`${newRole.name}`)
      .setColor(config.colour)
      .setDescription(`${user} has updated ${newRole.name}`)
      .addField("Name", `${oldRole.name} --> ${newRole.name}`, true)
      .addField("Mentionable", `${newRole.mentionable}`, true)
      .addField("ID", `\`\`\`excel\nRole - ${newRole.id}\`\`\``, true)
      .addField("Position", `${oldRole.position} -> ${newRole.position}`,true)
      .addField("Permissions", `\`${checkPerm(newRole)}\``)
      .setFooter(`CelestialKing#4781 | by nukestye`);


    reportchannel.send(roleUpdateEmbed);
    //log(chalk.red("ROLE UPDATE"), chalk.underline(newRole.name));
  }
};

function checkPerm(role) {
  let crole = role;
  const perms = new Permissions(crole.permissions);
  return perms.toArray();
};
