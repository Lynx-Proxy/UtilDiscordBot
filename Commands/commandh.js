const { prefix } = require('../Config.json')

const checkperms = (perms) => {     //function to check permissions
    for (const permission of perms) {
        if (!AllPerms.includes(permission)) {
          throw new Error(`Invaliad permission "${permission}"`)
        }
    }
}

const AllPerms = [  //Maybe there are more permissions
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

module.exports = (bot,commandinfo) => {
    let {
        commands,
        ExpectedArgs = '',
        PermsError = 'You do not have the permission to run this command',
        MinArgs = 0,
        MaxArgs = null,
        permissions = [],
        RequiredRoles = [],
        cback   //Callback
    } = commandinfo

    if(typeof commands === 'string'){
        commands = [commands]  //converts command into array (for ailiases)
    }

    if(permissions.length){
        if(typeof permissions === 'string'){
            permissions = [permissions] //converts to array for multiple perms

            checkperms(permissions) //Checks if permission is valid
        }
    }

    bot.on('message',(message) => {
        const { content,member,guild } = message //gets the content,member,guild attribute from message

        for(const aliases of commands){

            if(content.toLowerCase().startsWith(`${prefix}${aliases.toLowerCase()}`)){
                
                for(const perms of Permissions){
                    if(!member.hasPermission(perms)){  //Makes sure user has required permissions
                        message.reply(PermsError)
                        return
                    }
                }
                
                for(const requiredroles of RequiredRoles){  //Makes sure user has required roles
                    const role = guild.roles.cache.find((rol) => {
                        role.name == requiredroles
                    })

                    if(!role || member.roles.cache.has(role.id)){
                        message.reply(`You must have the ${requiredroles} to run this command`)
                        return
                    }
                }

                const arguments = content.split(/[ ]+/) //splits command into array
                argument.shift()

                if(arguments.length < MinArgs || (MaxArgs !== null && arguments.length > MaxArgs)){  //checks if the are to mmany arguments or to little arguments
                    message.reply(`Wrong syntax, Use ${prefix}${aliases}${ExpectedArgs}`)
                }

                cback(message,arguments,arguments.join(' '))

                return 
            }
        }
    })
}