// Getting the "Command" features from Commando
const { Command } = require('discord.js-commando')
const config = require('../../../config.json')
const ajax = require('axios')

// Code for the command
module.exports = class youtubeCommand extends Command {
  constructor (client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'youtube',
      // other ways to call the command, must be in lowercase
      aliases: ['yt', 'ytsearch'],
      // command group its part of
      group: 'public',
      // name within the command group, must be in lowercase
      memberName: 'youtube',
      // Is the description used for "help" command
      description: 'Search youtube for vidoes.',
      // adds cooldowns to the command
      throttling: {
        // usages in certain time x
        usages: 2,
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
    const randomNum = Math.floor(Math.random() * 5)

    const messageArry = message.content.split(' ')
    const args = messageArry.slice(1)

    yss({
      key: config.env.youtubeAPI,
      query: args.join(' '),
      maxResults: 5
    },
    callback
    )

    function callback (results) {
      const result = results[randomNum]

      // console.log(result.snippet);

      // embed don't allow vidoes therefore used the thumbnail
      const ytEmbed = {
        author: {
          name: `${result.snippet.channelTitle}`,
          url: `https://www.youtube.com/watch?v=${result.id.videoId}`
        },
        title: `${result.snippet.title}`,
        description: `${result.snippet.description}`,
        image: {
          url: result.snippet.thumbnails.high.url
        }
      }
      message.channel.send({ embed: ytEmbed })
    }
  }
}

function yss (options, callback) {
  if (!options.key) {
    throw new Error('You need API key for YouTube')
  }

  const params = {
    key: options.key,
    q: options.query,
    maxResults: options.maxResults || 10,
    part: 'snippet',
    type: 'video'
  }

  ajax.get(URL, { params })
    .then((response) => {
      if (callback) {
        callback(response.data.items)
      }
    })
    .catch((response) => {
      console.error(response)
    })
}
