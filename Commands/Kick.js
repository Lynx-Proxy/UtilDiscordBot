module.exports = {
  commands : ['kick','k'],
  ExpectedArgs : '',
  PermsError : 'You do not have the permission to run this command',
  MinArgs : 2,
  MaxArgs : 2,
  permissions : ['KICK_MEMBERS'],
  RequiredRoles : [],
  callback : (message,arguments,text) => {
    if(arguments[1] = message.mention.first()){
      const targetMember = message.guild.members.cache.get(arguments[1].id)
      targetMember.kick()
      targetMember.send(arguments[2])
    }
  }
}