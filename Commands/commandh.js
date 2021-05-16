const { prefix } = require("../Config.json");

const checkpermision = (permissions) => {
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

    for(const permission of permissions){
        if(!validPermissions.includes(permission)){
            throw new Error(`Permission not found ${permission}`);
        }
    }
}

module.exports = (bot,argoptions) => {
    let {
        commands,
        ExpectedArguments ="",
        PermissionError = 'You do not have permission to run this command',
        MinArguments = 0, 
        MaxArguments = null,
        Permissions = [],
        RequiredRoles = [],
        callback
    } = argoptions

    if(typeof commands === 'string'){
        commands = [commands];
    }

    console.log(`Loading command:${commands[0]}`)

    if(Permissions.length){
        if(typeof Permission === 'string'){
            Permissions = [Permissions];
        }
    }

    bot.on('message',(message) => {
        const { member, content, guild } = message;

        for(const alias of commands){
            if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)){
                for(const perms of Permissions){
                    if(!member.hasPermission(perms)){
                        message.reply(PermissionError);
                        return;
                    }
                }
                
                for(const reqrole of RequiredRoles){
                    const role = guild.roles.cache.find((role) => role.name === reqrole)

                    if(!role || member.roles.cache.has(role.id)){
                        message.reply(`you must have ${reqrole} role to use this commnd`)
                        return;
                    }
                }

                const args = content.split(/[ ]+/)

                args.shift();

                if(args.length < MinArguments || MaxArguments !== null && args.length > MaxArguments){
                    message.reply(`incorrect synatx use:${prefix}${alias}`)
                }

                callback(message,args,args.join(' '))

                return;
            }
        }
    });

    checkpermision(Permissions);
}