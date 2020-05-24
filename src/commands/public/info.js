// Getting the "Command" features from Commando
const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const config = require('../../../config.json')

// Code for the command
module.exports = class infoCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'info',
      // other ways to call the command, must be in lowercase
      aliases: ['information'],
      // command group its part of
      group: 'public',
      // name within the command group, must be in lowercase
      memberName: 'info',
      // how to use the cmd
      format: '[bot]/[server]',
      // Is the description used for "help" command
      description: 'Information regarding bot or server',
      // adds cooldowns to the command
      throttling: {
        // usages in certain time x
        usages: 1,
        // the cooldown in s
        duration: 10
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['SEND_MESSAGES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
      // Taking input from user
      args: [
        // <
        {
          // name of the argument/variable
          key: 'text',
          // a prompt asking the user
          prompt: 'Enter the category you want information about(Bot or Server): ',
          // the data type of the argument/variable
          type: 'string'
          // default value if nothing is entered
          // default: "hello",
          // check if the argument/variable matchs or not
          // validate: text => /* check here */text.length < 201,
          // Forces to be one of the options
          // oneOf:["bot","server"],
        }
        // > Part of one argument/variable
      ]
    })
  }

  // Run code goes here
  run (message, { text }) {
    // getting the guild the message is send in
    const guild = message.guild
    // Figuring out how many members and bots there are in the "guild"
    const memberCount = []
    const botCount = []
    guild.members.forEach((member) => {
      if (member.user.bot) {
        botCount.push(member.name)
      } else {
        memberCount.push(member.name)
      }
    })

    // finding the number of different channels
    const textChannels = []
    const categoryChannels = []
    const voiceChannels = []
    guild.channels.forEach((channel) => {
      if (channel.type === 'text') {
        textChannels.push(channel.name)
      } else if (channel.type === 'category') {
        categoryChannels.push(channel.name)
      } else if (channel.type === 'voice') {
        voiceChannels.push(channel.name)
      };
    })
    // finding the number of roles in the guild
    const roles = []
    guild.roles.forEach((role) => {
      roles.push(role.name)
    })
    // figuring out uptime
    let totalSeconds = (this.client.uptime / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`

    // making the server info embed
    const serverInfo = new Discord.RichEmbed()
      .setTitle(`${guild.name}`)
      .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`)
      .setTimestamp()
      .setColor(config.colour)
      // ----------------------------------------------------------------------------------------- //
      .addField('Owner:', `${guild.owner} - ID: ${guild.ownerID}`)
      .addField('Server ID', `${guild.id}`)
      .addField('Created at:', `${guild.createdAt}`)
      // ----------------------------------------------------------------------------------------- //
      .addField('Region', `${guild.region}`, true)
      .addField('Members: ', `${memberCount.length}`, true)
      .addField('Bots', `${botCount.length}`, true)
      // ----------------------------------------------------------------------------------------- //
      .addField('Categories', `${categoryChannels.length}`, true)
      .addField('Channels', `Text: ${textChannels.length} Voice: ${voiceChannels.length}`, true)
      .addField('Roles', `${roles.length}`, true)
      // ----------------------------------------------------------------------------------------- //
      .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)

    // owner avatar url
    const ownerURL = `https://cdn.discordapp.com/avatars/${this.client.owners[0].id}/${this.client.owners[0].avatar}.png?size=128`
    // finding the number of guilds the bot is in
    const guildsNum = []
    let totalMembers = 0
    this.client.guilds.forEach((guild) => {
      if (guild.available && !guild.deleted) {
        guildsNum.push(guild.name)
        totalMembers = totalMembers + guild.memberCount
      }
    })

    // making bot info embed
    const botInfo = new Discord.RichEmbed()
    // ----------------------------------------------------------------------------------------- //
    // .setTitle(`${this.client.user.tag}`)
      .setTimestamp()
      .setAuthor(`${this.client.owners[0].username}#${this.client.owners[0].discriminator}`, `${ownerURL}`)
      .setThumbnail(`${this.client.user.displayAvatarURL}`)
      .setColor(config.colour)
      .setDescription(`Uptime: ${uptime}`)
    // ----------------------------------------------------------------------------------------- //
      .addField('Name: ', `${this.client.user.tag}`, true)
      .addField('ID: ', `${this.client.user.id}`, true)
      .addField('Created At: ', `${this.client.user.createdAt}`, true)
    // ----------------------------------------------------------------------------------------- //
      .addField('Servers: ', `${guildsNum.length}`, true)
      .addField('Members: ', `${totalMembers}`, true)
      .addField('Discord: ', `${config.discord}`, true)
    // ----------------------------------------------------------------------------------------- //
      .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)

    if (text === 'server') {
      message.channel.send(serverInfo)
      // console.log(textChannels.length);
    } else if (text === 'bot') {
      message.channel.send(botInfo)
      // console.log(guildsNum.length);
    } else {
      // console.log();
      message.channel.send(`Incorrect Usage, \`${config.prefix}info [bot]/[server]\``)
    }
  }
}
