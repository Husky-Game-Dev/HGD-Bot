module.exports = {
  name: 'ban',
  category: 'Server',
  description: 'Give someone the ban hammer',
  perms: ['Officer', 'Core Officers', 'Executive Officers'],
  usage: '!husky ban <UserTag>',
  execute(message, args, client) {
    if(!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply(':x: You do not have permissions to ban');
    }
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return message.reply(':x: Bot do not have permissions to ban');
    }
    const userTag = args.shift();
    const user = client.users.cache.find(u => u.tag === userTag);
    if(user) {
      const member = message.guild.members.cache.get(user.id);
      message.guild.members.ban(member);
      message.author.send(`Banned ${userTag} successfully`);
    }
    else{
      message.delete();
      message.author.send(`Can't find user with tag: ${userTag}`);
    }
  },
};