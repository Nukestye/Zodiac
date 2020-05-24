// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando')
const Discord = require('discord.js')

// Code for the command
module.exports = class ticketCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'ticket',
      // other ways to call the command, must be in lowercase
      aliases: ['ticket', 'issue'],
      // command group its part of
      group: 'mod',
      // name within the command group, must be in lowercase
      memberName: 'ticket',
      // Is the description used for 'help' command
      description: 'Create a ticket under a support category',
      // adds cooldowns to the command
      throttling: {
        // usages in certain time x
        usages: 1,
        // the cooldown, x
        duration: 10
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Prevents anyone other than owner to use the command
      ownerOnly: false
    })
  }

  // Run code goes here
  run (message) {
    // separting the message into cmd & args
    const messageArry = message.content.split(' ')
    const messageLength = messageArry.length - 1
    // `.ticket create issue #1` is turned into
    // cmd = `.ticket`, option = `create`, issue = `issue #1`
    const option = messageArry[1]
    const issue = messageArry.slice(2, messageLength)
    const errorEmbed = new Discord.RichEmbed()
      .setTitle('Incorrect Usage!')
      .addField('Please use as:', `\`${this.client.commandPrefix}ticket [create/new] [Your Issue]\``)
      .setFooter('Made by - nukestye™', `${this.client.user.avatarURL}`)

    const permEmbed = new Discord.RichEmbed()
      .setTitle(message.author.tag)
      .setDescription('You do not have perms to close ticket, ask staff to do so.')
      .setFooter('Made by - nukestye™', `${this.client.user.avatarURL}`)

    if (option === 'create' || option === 'new') {
      const name = `Ticket-${message.author.discriminator}`
      if (issue.length < 1) return message.channel.send(errorEmbed)
      message.guild.createChannel(name, 'text').then(c => {
        const role = message.guild.roles.find('name', 'Staff')
        const role2 = message.guild.roles.find('name', '@everyone')

        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        })
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        })
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        })
        const category = message.guild.channels.find(c => c.name === 'Support' && c.type === 'category')

        if (category) {
          c.setParent(category.id)
        } else {
          if (!category) {
            message.guild.createChannel('Support', 'category').then(Category => {
              c.setParent(Category.id)
            })
          } else {
            console.error(`Category channel is missing:\nCategory: ${!!category}`)
            return message.channel.send(`Category channel is missing:\nCategory: ${!!category}`)
          }
        };

        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`)
        const embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.\n**Your Issue**\n ${issue.join(' ')}`)
          .setTimestamp()

        c.send({ embed: embed })
      }).catch(console.error)
    } else if (option === 'close') {
      if (message.member.roles.some(role => role.name === 'Staff')) {
        if (!message.channel.name.startsWith('ticket-')) return message.channel.send('You can\'t use the close command outside of a ticket channel.')

        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`${this.client.commandPrefix}confirm\`. This will time out in 10 seconds and be cancelled.`)
          .then((m) => {
            message.channel.awaitMessages(response => response.content === `${this.client.commandPrefix}confirm`, {
              max: 1,
              time: 10000,
              errors: ['time']
            })
              .then((collected) => {
                message.channel.delete()
              })
              .catch(() => {
                m.edit('Timed out, the ticket will not closed.')
                  .then(m2 => {
                    m2.delete()
                  }, 3000)
              })
          })
      } else {
        message.channel.send({ embed: permEmbed })
      };
    } else {
      message.channel.send(errorEmbed)
    }
  }
}
