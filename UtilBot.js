const path = require('path')
const fs = require('fs')
const discord = require('discord.js')
const bot  = new discord.Client()
const config = require('./Config.json')
const { brotliCompress } = require('zlib')

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

bot.on('guildMemberAdd',(member) => {
    bot.channels.cache.get('813785742538047539').then((channel) => {
        member.displayAvatarURL()
        var em = new discord.MessageEmbed()
        .setTitle(`Welcome to ${member.guild.name} please Read ${member.guild.channels.cache.get(813787210703699968).toString()}`)
        .setImage(member.displayAvatarURL())
        channel.send(em)
    })
})

bot.login(config.token)