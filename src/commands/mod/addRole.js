// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando');

// Code for the command
module.exports = class addRoleCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'addrole',
      // other ways to call the command, must be in lowercase
      aliases: ['role'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'addrole',
      // Is the description used for 'help' command
      description: 'Adds mentioned role to mentioned user.',
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ['ADMINISTRATOR', 'MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }
  // Run code goes here
  run(message) {
    let user = message.mentions.members.first();
    let roleToAdd = message.mentions.roles.first();

    // checking to see if the user has the role or not
    if(!(user.roles.find(r => r.name === roleToAdd.name))) {
      user.addRole(roleToAdd);
      message.channel.send(`${user} has been given the role: ${roleToAdd.name}`)
        .then(msg => {
          msg.delete(5000)
        });
    } else {
      message.channel.send(`${user} already has the role: ${roleToAdd.name}`);
    }

    // console.error(user, roleToAdd, message.member.roles.find(r => r.name === roleToAdd));

  }

};
