/*
*
* @author: nukestye
* @version: v1
*
*/
/*
* TODO:
* - Add more Public commands.
*/

const prefix = process.env.PREFIX
const owner = process.env.OWNER
const discord = process.env.DISCORD
const fs = require('fs')
const log = console.log

// Setting up the way to get commands
const { CommandoClient } = require('discord.js-commando')
const path = require('path')

// reading events
fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach((file) => {
    const eventFunction = require(`./src/events/${file}`)
    if (eventFunction.disabled) return
    const event = eventFunction.event || file.split('.')[0]
    const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client
    const { once } = eventFunction
    try {
      emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args))
    } catch (error) {
      console.error(error.stack)
    }
  })
})

const client = global.client = new CommandoClient({
  commandPrefix: `${prefix}`,
  owner: `${owner}`,
  invite: `${discord}`,
  unknownCommandResponse: false
})

// Registing the commands
client.registry
  .registerDefaultTypes()
// The different fields for cmds
  .registerGroups([
    ['mod', 'Moderation Commands'],
    ['public', 'Public Commands']
  ])
  .registerDefaultGroups()
// Basic cmds can be disabled like {"cmd: false"}
  .registerDefaultCommands()
// commands in "/src/commands" will be counted
  .registerCommandsIn(path.join(__dirname, '/src/commands'))

// list of activities that the bot goes through
const activityArray = [`${prefix}help | `]
// Bot lanuch code
client.once('ready', () => {
  log(`Logged in as ${client.user.tag} in ${client.guilds.size} guild(s)!`)
  setInterval(() => {
    const index = Math.floor(Math.random() * (activityArray.length)) // generates a random number between 1 and the length of the activities array list
    client.user.setActivity(
      activityArray[index],
      {
        type: 'PLAYING'
      }) // sets bot"s activities to one of the phrases in the arraylist.
  }, 5000) // updates every 10000ms = 10s
})
// If an error print it out
client.on('error', console.error)

// Login in using the token in config
client.login(process.env.TOKEN)
