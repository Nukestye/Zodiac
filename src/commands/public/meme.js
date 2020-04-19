// Getting the 'Command' features from Commando
const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const chalk = require('chalk');
const config = require('../../../config.json');
const snekfetch = require('snekfetch');


// Code for the command
module.exports = class memeCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: 'meme',
      // command group its part of
      group: 'public',
      // name within the command group, must be in lowercase
      memberName: 'meme',
      // Is the description used for 'help' command
      description: 'Generates a meme from r/dankmemes',
      // adds cooldowns to the command
      throttling: {
          // usages in certain time x
          usages: 1,
          // the cooldown
          duration: 10,
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['SEND_MESSAGES'],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }
  // Run code goes here
  async run(message) {
    const filters = {
      image: post => post.data.post_hint === 'image',
      text: post => !post.data.post_hint !== 'image' && post.data.selftext.length <= 2000 && post.data.title.length <= 256
    };

    const res = await snekfetch
        .get(`https://www.reddit.com/r/dankmemes/top/.json?sort=top&t=day&limit=500`);

    const posts = res.body.data.children.filter(filters["image"]);
    const randomNum = Math.floor(Math.random() * posts.length);


    const post = posts[randomNum];

    let embed = {
      title: post.data.title,
      color: 0x4B0082,
      url: `https://www.reddit.com${post.data.permalink}`,
      image: { url: "image" === 'image' ? post.data.url : '' },
      footer: { text: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
    }
  };

    message.channel.send({embed: embed});
    // console.log(post)

  }

};
