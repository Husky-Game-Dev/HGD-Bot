const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'info',
  category: 'Info',
  description: 'Information about the club',
  execute(message) {
    message.channel.send('Under construction');
  },
};
