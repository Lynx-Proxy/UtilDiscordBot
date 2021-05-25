const path = require('path')
const fs = require('fs')
const discord = require('discord.js')
const bot  = new discord.Client()
const config = require('./Config.json')

bot.on('ready', async () => {
    console.log(`Bot ready as ${bot.user.username}`)

    const handler = 'commandh.js'
    const commandh = require(`./Commands/${handler}`)

    function readcmds(dir){         //Reads Command Files
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            }
            else if (file !== handler){
                const options = require(path.join(__dirname,dir,file))
                commandh(bot,options)
                console.log("read files")
            }
        }
    }

    readcmds('Commands')
})

bot.login(config.token)