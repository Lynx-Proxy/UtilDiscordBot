const path = require('path')
const fs = require('fs')
const discord = require('discord.js')
const bot  = new discord.Client()
const config = require('./Config.json')


bot.login(config.token)