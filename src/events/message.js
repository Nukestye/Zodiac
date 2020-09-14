const Discord = require('discord.js');
const fs = require('fs');
const Path = require('path');
const config = require("../../config.json");
const chalk = require("chalk");
const autoMod = require("../configs/automod.json");


module.exports = {
    run: async(message) => {
        if (message.author.bot) return;
        if (autoMod.enabled === "true") {
            // Checking the message
            if (autoMod.config.blockedWord.enabled === "true") {
                let messageArray = message.content.split(" ");
                let bannedWords = autoMod.config.blockedWord.bannedWords;
                messageArray.forEach(word => {
                    bannedWords.forEach(bword => {
                        if (bword === word) {
                            message.delete().catch(O_o => {})
                            message.channel.send(`${message.author}, Please do not say a banned word.`);
                        }
                    })
                });
            }
        }
    }
};