// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando')

// Code for the command
module.exports = class clearCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'clear',
      // other ways to call the command, must be in lowercase
      aliases: ['purge', 'cls'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'clear',
      // Is the description used for 'help' command
      description: 'Clears x number of messages in mentioned channel',
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
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_MESSAGES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
      // Taking input from user
      args: [
        // <
        {
          // name of the argument/variable
          key: 'x',
          // a prompt asking the user
          prompt: 'Enter the number of message to be cleared: ',
          // the data type of the argument/variable
          type: 'integer',
          // default value if nothing is entered
          // default: 'hello',
          // check if the argument/variable matchs or not
          validate: x => x >= 2 <= 100
          // Forces to be one of the options
          // oneOf:['nothing','nothing2', 'hello'],
        }
        // > Part of one argument/variable
      ]
    })
  }

  // Run code goes here
  run (message, { x }) {
    message.channel.bulkDelete(x)
      .catch(err => {
        console.error(err)
        message.channel.send('There was an error trying to prune messages in this channel!')
      })
  }
}
