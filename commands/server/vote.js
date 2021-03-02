const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'vote',
  category: 'Server',
  description: 'Start a new vote',
  perms: 'Officer',
  usage: '!husky vote <topic> | option 1 | option 2 | ...',
  execute(message, args, client) {
    message.channel.send('Starting a vote');
    if(!args.length) {
      return message.reply('Try `!husky vote <topic> | option 1 | ...`');
    }
    // !husky vote ...
    const slice = process.env.PREFIX.length + 1 + this.name.length;
    // <topic> | option 1 | option 2 | ...
    let options = message.content.slice(slice).trim().split('|');
    if(options.length >= 12) return message.reply('Limit to 10 or less options pls I don\'t have enough emoji 😭');
    const reg = new RegExp('^[t,T]:[0-9]+', '');
    let topic = options.shift().trim();
    let time = topic.match(reg);
    if(time != null && time.length > 0) {
      topic = topic.replace(reg, '').trim();
      time = parseInt(time[0].slice(2));
    } else {time = 60;}

    // message.delete();
    // If no option is defined, default to yes and no
    if(options.length <= 0) {
      options = ['Yes', 'No'];
    }

    const emojiList = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    const filter = (react, user) =>{
        return user.id != client.user.id && emojiList.includes(react.emoji.name);
    };
    let description = '';
    const votes = new Array(options.length);
    const voted = new Set();
    for(let i = 0; i < options.length; i++) {
      votes[i] = 0;
      description += `**${i + 1}.** \`${votes[i]}\` - ${options[i]}\n`;
    }
    // initial embed
    const embed = new MessageEmbed()
    .setThumbnail(client.user.avatarURL())
    .setTitle(topic)
    .setFooter(`Vote started by ${message.author.tag} for ${time} mins`, message.author.displayAvatarURL());
    message.channel.send(embed.setDescription(description)).then(sent => {
      for(let i = 0; i < options.length; i++) {
        sent.react(emojiList[i]);
      }
      // start collecting reaction for votes
      // 1 hour
      const t = time * 60000;
      const collector = sent.createReactionCollector(filter, { time: t });

      collector.on('collect', (react, user) => {
        if(voted.has(user.id)) {
          react.users.remove(user.id);
          user.send(embed.setTitle('⚠️ Already voted!').setDescription(`You already have voted for \`${topic}\``));
          return;
        }
        voted.add(user.id);
        react.users.remove(user.id);
        // update description
        description = '';
        votes[emojiList.indexOf(react.emoji.name)]++;
        for(let i = 0; i < options.length; i++) {
          description += `**${i + 1}.** \`${votes[i]}\` - ${options[i]}\n`;
        }
        sent.edit(embed.setTitle(topic).setDescription(description));
      });

      collector.on('end', () =>{
        sent.channel.send(`Vote for \`${topic}\` has ended!`);
      });
    });
  },
};