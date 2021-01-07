const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'announce',
  category: 'Server',
  description: 'Make an announcment to or the same text channel',
  usage: '**!husky announce <channelID> (SAFE)**, \n**!husky announce <channelID> <message>**, \n**!husky announce <message>**',
  execute(message) {
    message.channel.send('Under construction');
  },
};
