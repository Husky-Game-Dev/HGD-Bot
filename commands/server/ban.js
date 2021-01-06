module.exports = {
  name: 'ban',
  category: 'Server',
  description: 'Give someone the ban hammer',
  execute(message) {
    if(!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply(':x: You do not have permissions to ban');
    }
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return message.reply(':x: Bot do not have permissions to ban');
    }
    message.channel.send('Under construction');
  },
};