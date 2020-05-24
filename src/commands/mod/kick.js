// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const chalk = require('chalk')
const log = console.log

// Code for the command
module.exports = class kickCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'kick',
      // other ways to call the command, must be in lowercase
      aliases: ['boot', 'tempban'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'kick',
      // Is the description used for 'help' command
      description: 'Kick command.',
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
      userPermissions: ['KICK_MEMBERS'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false

    })
  }

  // Run code goes here
  run (message) {
    const messageArry = message.content.split(' ')
    const args = messageArry.slice(1)

    const kUser = message.guild.member(message.mentions.users.first() || message.guild.get(args[0]))
    if (!kUser) return message.channel.send('User cannot be found!')
    const kreason = args.join(' ').slice(22)

    // setting up the embed for report/log
    const kickEmbed = new RichEmbed()
      .setDescription(`Report: ${kUser} Kick`)
      .addField('Reason >', `${kreason}`)
      .addField('Time', message.createdAt)

    const reportchannel = message.guild.channels.find('name', 'report')
    if (!reportchannel) return message.channel.send('*`Report channel cannot be found!`*')

    // Delete the message command
    // eslint-disable-next-line camelcase
    message.delete().catch(O_o => {})
    // Kick the user with reason
    message.guild.member(kUser).kick(kreason)
    // sends the kick report into log/report
    reportchannel.send(kickEmbed)
    // Logs the kick into the terminal
    log(chalk.red('KICK', chalk.underline.bgBlue(kUser) + '!'))
  }
}
