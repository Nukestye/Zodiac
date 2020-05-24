// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando')

// Code for the command
module.exports = class newCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'removerole',
      // other ways to call the command, must be in lowercase
      aliases: ['rrole', 'deleterole'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'removerole',
      // Is the description used for 'help' command
      description: 'Removes mentioned role from mentioned user.',
      // adds cooldowns to the command
      throttling: {
        // usages in certain time x
        usages: 1,
        // the cooldown
        duration: 10
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ['ADMINISTRATOR', 'MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false
    })
  }

  // Run code goes here
  run (message, { text }) {
    const user = message.mentions.members.first()
    const role = message.mentions.roles.first()

    // checking to see if the user has the role or not
    if ((user.roles.find(r => r.name === role.name))) {
      user.removeRole(role)
      message.channel.send(`Removed ${role.name} from ${user}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else {
      message.channel.send(`${user} does not have ${role.name} role!`)
    }

    // console.error(user, roleToAdd, message.member.roles.find(r => r.name === roleToAdd));
  }
}
