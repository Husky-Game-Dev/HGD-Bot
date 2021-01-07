const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'report',
  category: 'Server',
  description: 'Make an announcment to or the same text channel',
  usage: '!husky report <UserTag> <Reason>',
  execute(message, args, client) {
    message.channel.send('Under construction, might be missing feature');
    const userTag = args.shift();
    const user = client.users.cache.find(u => u.tag === userTag);
    if(user) {
      const channel = message.guild.channels.cache.find(chan => chan.name === 'reports');
      if(!channel) return message.reply('Can\'t find report channel!');

      const reportEmbed = new MessageEmbed()
      .setColor('#F93A2F')
      .setTitle(`${userTag} was reported by ${message.author.tag}`)
      .setAuthor('Husky Game Dev', 'https://i.imgur.com/xMskFdp.png', 'https://huskygamedev.com')
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp()
      .setFooter(`Reported by ${message.author.tag}`, message.author.displayAvatarURL());

      const description = `**REASON:** \`${args.join(' ')}\` 
                          \n**DATE:** \`${new Intl.DateTimeFormat('en-US').format(Date.now())}\``;
      channel.send(reportEmbed.setDescription(description));
    }
    else{
      message.reply(`Can't find user with tag: ${userTag}`);
    }
  },
};
