const { prefix } = require("../Config.json")
const { MessageEmbed } = require("discord.js")

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    commands: 'Kick',
    ExpectedArguments: ' <Member> <Reason>',
    PermissionError: 'You need admin permissions to run this command',
    MinArguments: 2,
    MaxArguments: 2,
    callback: (message, arguments, text,bot) => {
        let { mentions } = message

        if(message.channel == 'dm') return;

        const user = mentions.users.first()

        if(!user){
            var syntax_embed = new MessageEmbed()
            .setTitle("Incorrect Syntax")
            .setDescription("Use:\n`" + prefix + 'kick' + " <Member> <Reason>" + "`")
            .setColor("#FF94FE")
            .setFooter(today,"https://images.alphacoders.com/100/1006618.jpg")
            message.reply(syntax_embed)
        }
        else{
            const target = message.guild.members.cache.get(user.id)
            const kicked = new MessageEmbed()
            .setTitle("User Kicked")
            .setDescription(`***<@${user.id}> has been kicked by:\n\n<@${message.author.id}>\nReason:\n\n${arguments[1]}***`)
            .setThumbnail(message.author.displayAvatarURL())
            .setColor("BLUE")
            .setFooter(today,"https://images.alphacoders.com/100/1006618.jpg")
            try {
                //target.kick()
                bot.channels.cache.get('824534435914973225').send(kicked)                
            } catch (error) {
                console.log(error)
            }
        }
    },
    permissions: ['KICK_MEMBERS'],
}