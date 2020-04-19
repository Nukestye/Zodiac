const Discord = require('discord.js');
const config = require("../../config.json");
const chalk = require("chalk");


module.exports = {
  run: async (member) => {
    // finding the guild & new member role
    const guild = member.guild;
    const newMemberRole = guild.roles.find(x => x.name === "Member");

    // if the new member role doesn't exit make an error
    if(!newMemberRole) {
      return console.error(chalk.red("[!] New Member role isn't found!"))
    } else {
      member.addRole(newMemberRole);
    };



    let welcomeChannel = guild.channels.find(x => x.name === config.log_channels.welcome_channel);
    let eventChannel = guild.channels.find (x => x.name === config.log_channels.events);
    // checking to see if either channels are not defined
    if(!welcomeChannel || !eventChannel) return console.error(chalk.red(`[!] [Member Join] Welcome Channel or Report Channel are not found\nRename Welcome Channel to "${config.log_channels.welcome_channel}" & report Channel to "config.log_channels.events"!`))


    if(welcomeChannel == eventChannel) return console.error(chalk.red("[!] [Member Join] Welcome channel cannot be the same as event channel"));

    let userAvatar = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=128`;

    let welcomeChannelEmbed = new Discord.RichEmbed()
      .setTitle(`Welcome to ${guild.name} - ${member.user.username}!`)
      .setColor(config.colour)
      .setDescription(`Check out the rules in #${config.info_channels.rules}!`);

    welcomeChannel.send( welcomeChannelEmbed )
      .catch(console.error());
    eventChannel.send(`${member.user.username} has joined!`)
      .catch(console.error());
  }
}
