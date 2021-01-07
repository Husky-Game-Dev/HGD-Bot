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
        { name: ':information_source: Info', value: '`help` `info` `workshop` `event` `TBD`', inline: true },
        { name: ':partying_face: Server', value: '`announce` `kick` `ban` `report` `TBD` `TBD`', inline: true },
        { name: ':laughing: Fun', value: '`gif` `presidential` `trumptweet` `rps` `TBD` `TBD`', inline: true },
      );
      return message.channel.send(helpEmbed);
    }

    const command = args.shift().toLowerCase();
    if(client.commands.has(command)) {
      const cmd = client.commands.get(command);
      let about = `\`Command name:\` ${cmd.name} 
                     \n\`Category:\` ${cmd.category}
                     \n\`Description:\` ${cmd.description}`;
      if(cmd.usage) about += `\n\`Usage:\` ${cmd.usage}`;
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
