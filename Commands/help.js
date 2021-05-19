const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'help',
    ExpectedArguments: ' <help , category>',
    PermissionError: 'You need admin permissions to run this command',
    MinArguments: 0,
    MaxArguments: 1,
    callback: (message, arguments, text) => {
      if(arguments[0] == 'Admin'.toLowerCase()){
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
      else{
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