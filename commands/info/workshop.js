const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'workshop',
  category: 'Info',
  description: 'Information about upcoming/previous workshops',
  execute(message) {
    message.channel.send('Under construction, might be missing feature');
  },
};
