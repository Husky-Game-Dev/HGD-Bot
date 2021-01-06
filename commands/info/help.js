const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Info',
  description: 'Description about the bot\'s commands',
  execute(message, args, client) {
    if(!args.length) {
      const helpEmbed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setTitle('Commands list')
      .setAuthor('Husky Game Dev', 'https://i.imgur.com/xMskFdp.png', 'https://huskygamedev.com')
      .setColor('RANDOM')
      .setDescription('Use `!husky help [command]` for specific command help')
      .addFields(
        { name: ':information_source: Info', value: '`help` `TBD` `TBD` `TBD` `TBD`', inline: true },
        { name: ':partying_face: Server', value: '`kick` `ban` `TBD` `TBD` `TBD`', inline: true },
        { name: ':laughing: Fun', value: '`gif` `presidential` `trumptweet` `rps`', inline: true },
      );
      return message.channel.send(helpEmbed);
    }
    // !husky command arg2 arg3...
    const command = args.shift().toLowerCase();
    if(client.commands.has(command)) {
      const cmd = client.commands.get(command);
      const about = `\`Command name:\` ${cmd.name} 
                     \n\`Category:\` ${cmd.category}
                     \n\`Description:\` ${cmd.description}`;
      const commandEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setThumbnail(client.user.avatarURL());
      return message.channel.send(commandEmbed.setDescription(about));
    }
    else{
      const invalidEmbed = new MessageEmbed()
      .setColor('#F93A2F')
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
