// Getting the "Command" features from Commando
const { Command } = require('discord.js-commando')

// Code for the command
module.exports = class newCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'newname',
      // other ways to call the command, must be in lowercase
      aliases: ['alias1', 'alias2'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'newcommand',
      // Is the description used for "help" command
      description: 'Description for the new Command',
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
      ownerOnly: true,
      // Taking input from user
      args: [
        // <
        {
          // name of the argument/variable
          key: 'text',
          // a prompt asking the user
          prompt: 'Enter the text',
          // the data type of the argument/variable
          type: 'string'
          // default value if nothing is entered
          // default: "hello",
          // check if the argument/variable matchs or not
          // validate: text => /* check here */text.length < 201,
          // Forces to be one of the options
          // oneOf:["nothing","nothing2", "hello"],
        }
        // > Part of one argument/variable
      ]
    })
  }

  // Run code goes here
  run (message, { text }) {
    // interact with client(bot) using "this.client"
    // console.log(this.client);
    // "message.say" is the same as "message.channel.send" in commando
    return message.reply(text)
  }
}
