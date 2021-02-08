const { MessageEmbed } = require('discord.js');
const { club1 } = require('../../clubinfo.json');

module.exports = {
  name: 'info',
  category: 'Info',
  description: 'Information about the club',
  execute(message) {
    const infoEmbed = new MessageEmbed()
    .setAuthor('Husky Game Dev', 'https://i.imgur.com/xMskFdp.png', 'https://huskygamedev.com')
    .setTitle('About us')
    .setThumbnail('https://i.imgur.com/xMskFdp.png')
    .addFields(
        { name: ':earth_americas:Website', value: `[huskygamedev.com](${club1.website})`, inline: true },
        { name: '👥Linkedin', value: `[huskygamedev](${club1.linkedin})`, inline: true },
        { name: '🐦Twitter', value: `[@husky_dev](${club1.twitter})`, inline: true },
        { name: '📸Instagram', value: `[@husky_dev](${club1.instagram})`, inline: true },
        { name: ':regional_indicator_f:Facebook', value: `[UWB Husky Game Dev](${club1.facebook})`, inline: true },
      );
    message.channel.send(infoEmbed.setDescription(' ' + club1.description));
  },
};
