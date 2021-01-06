module.exports = {
  name: 'announce',
  category: 'Server',
  description: 'Make an announcment to or the same text channel',
  usage: '**!husky announce <channelID>**, \n**!husky announce <channelID> <message>**, \n**!husky announce <message>**',
  execute(message, args) {
    message.channel.send('Under construction');
    if(!args) {
      return message.reply('Please indicate a channelID or message you want to send');
    }
  },
};