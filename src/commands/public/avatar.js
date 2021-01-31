// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando')
const config = require('../../../config.json')
const Discord = require('discord.js')

// Code for the command
module.exports = class avatarCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'avatar',
      // other ways to call the command, must be in lowercase
      aliases: ['pfp'],
      // command group its part of
      group: 'public',
      // name within the command group, must be in lowercase
      memberName: 'avatar',
      // Is the description used for 'help' command
      description: 'Shows Profile Picture of mentioned user or themselves.',
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
      userPermissions: ['SEND_MESSAGES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false
    })
  }

  // Run code goes here
  run (message) {
    const messageArry = message.content.split(' ')
    const args = messageArry.slice(1)
    let user = []
    if (args === '') {
      user = message.author
      console.log('No args in message')
    } else {
      user = message.mentions.users.first()
      console.log('args in message')
    }

    const avatarEmebd = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
      .setColor(config.colour)
      .setDescription(`[${user}'s Avatar](${user.displayAvatarURL})`)
      .setImage(user.displayAvatarURL)

    message.channel.send(avatarEmebd)
    // console.log(message.author);
  }
}
