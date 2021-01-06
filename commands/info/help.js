const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'info',
  description: 'Description about the bot\'s commands',
  execute(message, args, client) {
    if(!args.length) {
      const helpEmbed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setTitle('Commands list')
      .setAuthor('Husky Game Dev', 'https://i.imgur.com/xMskFdp.png', 'https://huskygamedev.com')
      .setColor('RANDOM')
      .setDescription('Use `!husky help [command]` to get more help!')
      .addFields(
        { name: 'Info', value: '`help` `TBD` `TBD` `TBD` `TBD`', inline: true },
        { name: 'Server', value: '`kick` `ban` `TBD` `TBD` `TBD`', inline: true },
        { name: 'Fun', value: '`gif` `presidential` `trumptweet` `rps`', inline: true },
      );
      return message.channel.send(helpEmbed);
    }
    // !husky command arg2 arg3...
    const command = args.shift().toLowerCase();
    if(client.commands.has(command)) {
      message.channel.send(command);
    }
    else{
      const invalidEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Help error!')
      .setURL('https://huskygamedev.com')
      .setAuthor('Husky Game Dev', 'https://i.imgur.com/xMskFdp.png', 'https://huskygamedev.com')
      .setDescription(`Unknown command: ${command} ${args}`)
      .addFields(
        { name: 'Code', value: '111x9' },
      )
      .setImage('https://i.imgur.com/xMskFdp.png')
      .setTimestamp()
      .setFooter('Bot error log');
      return message.channel.send(invalidEmbed);
    }
  },
};
