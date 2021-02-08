module.exports = {
  name: 'kick',
  category: 'Server',
  description: 'Kick some one',
  perms: 'Officer',
  usage: '!husky ban <UserTag>',
  execute(message, args, client) {
    if(!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply(':x: You do not have permissions to kick');
    }
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.reply(':x: Bot do not have permissions to kick');
    }
    const userTag = args.shift();
    const user = client.users.cache.find(u => u.tag === userTag);
    if(user) {
      const member = message.guild.members.cache.get(user.id);
      member.kick(`Kick reason: ${args.join(' ')}`);
      message.author.send(`Kicked ${userTag} successfully`);
    }
    else{
      message.delete();
      message.author.send(`Can't find user with tag: ${userTag}`);
    }
  },
};