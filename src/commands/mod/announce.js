// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
// Code for the command
module.exports = class announcementCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'announce',
      // other ways to call the command, must be in lowercase
      aliases: ['ann', 'announcement'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'announce',
      // Is the description used for 'help' command
      description: 'Announcement Command',
      // adds cooldowns to the command
      throttling: {
        // usages in certain time x
        usages: 5,
        // the cooldown
        duration: 30
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_MESSAGES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false
    })
  }

  // Run code goes here
  run (message) {
    // Seprating the message into 'cmd' and 'args'
    const messageArry = message.content.split(' ')
    const args = messageArry.slice(1)
    // Using the args to find the Title and Description
    var length = args.length
    var pos = args.indexOf('|')
    var title = args.slice(1, pos)
    var text = args.slice(pos + 1, length)
    if (title.length <= 0) {
      title = 'Important Announcement: '
    } else {
      title = 'Important Announcement: \n' + title.join(' ')
    }
    console.log(text.length)
    console.log(title.length)
    if (text.length < 1 && title.length < 1) return message.channel.send('Incorrect Usage!\n`+announce [#Channel] [Title] | [Description]`')

    const embed = new RichEmbed()
      .setColor('#4B0082')
      .setTitle(title)
      .setDescription(`@everyone,\n${text.join(' ')}`)

    const channelq = message.mentions.channels.first()
    if (!channelq) return message.channel.send('Incorrect Usage!\n`+announce [#Channel] [Title] | [Description]`')
    channelq.send('@everyone')
      .then(msg => {
        msg.delete({ timeout: 100000 })
      })

    channelq.send({ embed })
    // eslint-disable-next-line camelcase
    message.delete().catch(O_o => {})
  }
}
