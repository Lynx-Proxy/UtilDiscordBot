const { MessageEmbed } = require("discord.js")

const answers = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes – definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes Signs point to yes', 'Reply hazy', 'try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Dont count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful']

const reply = Math.floor(Math.random() * answers.length)

module.exports = {
    commands : ['8ball','8r'],
    ExpectedArguments: '<Question>',
    callback:(message,arguments,text,bot) => {
        var ball = new MessageEmbed()
        .setTitle("8ball")
        .setDescription("```lua\nQuestion: " + text + "\nAnswer: " + answers[reply] + "```")
        .setColor("RANDOM")

        message.channel.send(ball)
    },
}