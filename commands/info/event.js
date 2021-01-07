const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'event',
  category: 'Info',
  description: 'Show all up coming event',
  execute(message) {
    message.channel.send('Under construction, might be missing feature');
  },
};
