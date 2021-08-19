let activated = false
const { MessageEmbed } = require("discord.js")
const { MaxArguments } = require("./sudo")
const coinsides = ['heads','tales']

module.exports = {
    commands : ['coinflip','cp'],
    ExpectedArguments: '<coin-side> <text>',
    MinArgumenst : 2,
    MaxArguments : null,
    callback : (message,arguments,text,bot) => {
        let shifted = arguments.join(" ")
        let index = Math.floor(Math.random() * coinsides.lenght)
        if(!activated){
            if(arguments[0] != 'heads' || 'tails'){
                console.log(arguments[0])
                message.reply("you must use a proper coin side name like heads or tails")
            }
            else{
                activated = true
                var coinflipembed = new MessageEmbed()
                .setTitle("Coinflip")
                .setDescription("```\n" + message.author.tag + " has initiated a coinflip\n\nCoinflip bet: " + `${shifted}` + "\n\nCoin Side:" + arguments[0] + "\n\n if you want to bet type the opposite coinside in chat (you have 10 seconds to type it)" + "````")
                message.channel.send(coinflipembed)
                setTimeout(() => {
                    message.reply("no one replied so the bet has ended")
                }, 10000);
                bot.on('message',(messag) => {
                    if(arguments[0] = 'heads'){
                        if(messag.content == 'tales'){
                            message.reply(messag.author.tag + "has coinfliped with u").then((m) => {
                                m.edit(`${coinsides[index]} won`)
                            })
                        }
                    }
                    else if(arguments[0] = 'tales'){
                        if(messag.content == 'head'){
                            message.reply(messag.author.tag + "has coinfliped with u").then((m) => {
                                m.edit(`${coinsides[index]} won`)
                            })
                        }
                    }
                })
            }
        }
    }
}
