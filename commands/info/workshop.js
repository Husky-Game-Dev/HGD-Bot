const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'workshop',
  category: 'Info',
  description: 'Information about upcoming/previous workshops',
  execute(message) {
    message.channel.send('Under construction');
    message.channel.send('You can find past workshops on our website https://huskygamedev.com');
  },
};
