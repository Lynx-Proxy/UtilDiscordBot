const { MessageEmbed } = require("discord.js")

module.exports = {
    commands:['purge','p'],
    ExpectedArguments: '<number of messages>',
    PermissionError: 'You need admin permissions to run this command',
    MinArguments: 1,
    MaxArguments: 1,
    callback: (message, arguments, text,bot) => {

        try{
            if(!arguments[0] > 1000)
            {
                message.channel.bulkDelete(arguments[0])
            }
            else{
                var limit = new MessageEmbed()
                .setTitle("❌You cannont delete more than 1000 messages")
                .setColor("BLUE")
                message.channel.send(limit)
            }
        }
        catch{}
        
    },
    permissions: ['ADMINISTRATOR'],
    RequiredRoles:['Admin','🎇Moderator🎇']
}