const { prefix } = require("../Config.json")
const { MessageEmbed } = require("discord.js")

const checkpermision = (permissionsss) => {
    const validPermissions = [
      'CREATE_INSTANT_INVITE',
      'KICK_MEMBERS',
      'BAN_MEMBERS',
      'ADMINISTRATOR',
      'MANAGE_CHANNELS',
      'MANAGE_GUILD',
      'ADD_REACTIONS',
      'VIEW_AUDIT_LOG',
      'PRIORITY_SPEAKER',
      'STREAM',
      'VIEW_CHANNEL',
      'SEND_MESSAGES',
      'SEND_TTS_MESSAGES',
      'MANAGE_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'MENTION_EVERYONE',
      'USE_EXTERNAL_EMOJIS',
      'VIEW_GUILD_INSIGHTS',
      'CONNECT',
      'SPEAK',
      'MUTE_MEMBERS',
      'DEAFEN_MEMBERS',
      'MOVE_MEMBERS',
      'USE_VAD',
      'CHANGE_NICKNAME',
      'MANAGE_NICKNAMES',
      'MANAGE_ROLES',
      'MANAGE_WEBHOOKS',
      'MANAGE_EMOJIS',
    ]

   for(const perms of permissionsss){
       if(!validPermissions.includes(perms)){
           throw new Error(`Permission not found ${perms}`)
       }
   }
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = (bot,argoptions) => {
    let {
        commands,
        ExpectedArguments ="",
        _PermissionError = 'You do not have permission to run this command',
        MinArguments = 0, 
        MaxArguments = null,
        permissions = [],
        RequiredRoles = [],
        callback
    } = argoptions

    if(typeof commands === 'string'){
        commands = [commands];
    }

    console.log(`Loading command:${commands[0]}`)

    if(permissions.length){
        if(typeof Permission === 'string'){
            permissions = [permissions];
        }
    }

    bot.on('message',(message) => {
        const { member, content, guild } = message;

        if(message.channel == 'dm') return;

        for(const alias of commands){
            if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)){
                for(const perms of permissions){
                    if(!member.hasPermission(perms)){
                        message.reply(_PermissionError);
                        return;
                    }
                }
                
                for(const reqrole of RequiredRoles){
                    const role = guild.roles.cache.find((role) => role.name === reqrole)


                    if(!role || !member.roles.cache.has(role.id)){
                        var role_embed = new MessageEmbed()
                        .setTitle(`You need ${reqrole}`)
                        .setColor("#FF3C38")
                        message.reply(role_embed)
                        return;
                    }
                }

                const args = content.split(/[ ]+/)

                args.shift();
                console.log(args.length)
                console.log(args)
                if(args.length < MinArguments || MaxArguments !== null && args.length > MaxArguments){
                    var syntax_embed = new MessageEmbed()
                    .setTitle("Incorrect Syntax")
                    .setDescription("Use:\n`" + prefix + alias + " " + ExpectedArguments + "`")
                    .setFooter(today,"https://images.alphacoders.com/100/1006618.jpg")
                    .setColor("#FF94FE")
                    message.reply(syntax_embed)
                    return
                }

                callback(message,args,args.join(' '),bot)

                return;
            }
        }
    });

    checkpermision(permissions);
}
