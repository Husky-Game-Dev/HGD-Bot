const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'announce',
  category: 'Server',
  description: 'Make an announcment to or the same text channel',
  usage: '**!husky announce <channelID> (SAFE)**, \n**!husky announce <channelID> <message>**, \n**!husky announce <message>**',
  async execute(message, args, client) {
    message.channel.send('Under construction');
    if(!args.length) {
      return message.reply('Please indicate a channelID and/or message you want to send');
    }

    const first = args.shift();
    const channel = client.channels.cache.get(first);

    if(args.length === 0 && channel) {
      const filter = (m) => m.author.id === message.author.id;
      const embed = new MessageEmbed()
        .setAuthor('Husky Game Dev', 'https://i.imgur.com/xMskFdp.png', 'https://huskygamedev.com')
        .setTitle('Waiting for response...')
        .setDescription(`<@${message.author.id}> sending message to channel: \`#${channel.name}\`
        \n:x: - To cancel`)
        .setThumbnail(client.user.avatarURL());
      await message.reply(embed).then(sent => sent.react('❌'));

      const filterReact = (react, user) => {
        return ['❌', '✅'].includes(react.emoji.name) && user.id === message.author.id;
      };
      // fetch the last message by the bot
      let cancel = false;
      message.channel.messages.fetch({ limit: 1 }).then(messages => {
        const lastMessage = messages.first();
        const reactColl = lastMessage.createReactionCollector(filterReact, { time: 60000 });
        reactColl.on('collect', () => {
          lastMessage.delete();
          cancel = true;
          return message.reply('Operation canceled ❌');
        });
      })
      .catch(console.error);
      // Wait for respond from user
      const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', m => {
        if(cancel) return;
        message.reply(`Please confirm to channel \`#${channel.name}\`:\n \`\`\`${m.content}\`\`\``).then(sent => {
          sent.react('✅');
          sent.react('❌');
          m.delete();
          sent.awaitReactions(filterReact, { max: 1, time: 60000, error: ['time'] })
            .then(collected => {
              const reaction = collected.first();
              if(reaction.emoji.name === '✅') {
                channel.send(m.content);
                return message.reply('Sent! ✅');
              }else if(reaction.emoji.name === '❌') {
                sent.delete();
                return message.reply('Operation canceled ❌');
              }
            });
        });
      });
    }
    else if(args.length >= 0 && !channel) {
      message.delete();
      const msg = first + ' ' + args.join(' ');
      return message.channel.send(msg);
    }
    else if(args.length >= 1 && channel) {
      channel.send(args.join(' '));
      return message.reply(`Announce in \`#${channel.name}\` with msg: \`${args}\``);
    }
    else{
      return message.reply('Can\'t find channel ID');
    }
  },
};
