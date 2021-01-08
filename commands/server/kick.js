module.exports = {
  name: 'kick',
  category: 'Server',
  description: 'Kick some one',
  perms: 'Officer',
  execute(message) {
    if(!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply(':x: You do not have permissions to kick');
    }
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.reply(':x: Bot do not have permissions to kick');
    }
    message.channel.send('Under construction');
  },
};