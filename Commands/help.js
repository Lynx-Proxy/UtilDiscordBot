const { MessageEmbed } = require("discord.js")


module.exports = {
    commands: 'help',
    ExpectedArguments: ' <help , category>',
    PermissionError: 'You need admin permissions to run this command',
    MinArguments: 0,
    MaxArguments: 1,
    callback: (message, arguments, text,bot) => {
      if(arguments[0] == 'admin'){
        var help_embed = new MessageEmbed()
        .setTitle("HELP")
        .setColor("BLUE")
        .addFields({
            name:"Ban",
            value:"Bans a member from the server",
            inline:false
          },
          {
            name:"Kick",
            value:"Kicks a member from the server",
            inline:false
          },
          {
            name:"Purge",
            value:"Deletes a specified amount of messages",
            inline:false
          })
        message.channel.send(help_embed)
      }
      else if(arguments[0] == 'member'){
        var help_embed_Members = new MessageEmbed()
        .setTitle("HELP")
        .setColor("BLUE")
        .addFields({
            name:"Suggest",
            value:"Suggest a command (I am not creative lol)",
            inline:false
          },
          )
        message.channel.send(help_embed_Members)
      }
      else if(arguments[0] = undefined){
        var help_embed = new MessageEmbed()
        .setTitle("HELP")
        .setColor("BLUE")
        .addFields({
            name:"AdminHelp",
            value:"Commands for admin",
            inline:false
          },
          {
            name:"MemberHelp",
            value:"Commands for members",
            inline:false
        })
        message.channel.send(help_embed)
      }
      
    },
}