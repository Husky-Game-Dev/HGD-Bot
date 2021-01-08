const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'rps',
  category: 'Fun',
  description: 'Rock Paper Scissor',
  usage: '!husky rps',
  execute(message, args) {
    if(args.length > 0) return message.reply('Try ``!husky rps`` instead');
    const arr = ['✌️', '✊', '✋'];
    const filterReact = (react, user) => {
        return arr.includes(react.emoji.name) && user.id === message.author.id;
    };
    const rpsEmbed = new MessageEmbed()
    .setThumbnail(message.author.displayAvatarURL())
    .setTitle('Playing Rock Paper Scissor')
    .setDescription('✊ ROCK <---> ✋ PAPER <---> ✌️ SCISSOR')
    .setFooter(`For ${message.author.tag}`);
    message.channel.send(rpsEmbed).then(msg => {
      msg.react('✊');
      msg.react('✋');
      msg.react('✌️');
      const botRand = Math.floor(Math.random() * 3);
      msg.awaitReactions(filterReact, { max: 1, time: 30000, errors: ['time'] })
        .then((collected) => {
          const reaction = collected.first();
          const resultEmbed = new MessageEmbed().setThumbnail(message.author.displayAvatarURL())
              .setTitle('Result of Rock Paper Scissor')
              .setDescription(`You chose${reaction.emoji.name}\n Bot chose:${arr[botRand]}\n` + result(reaction.emoji.name, arr[botRand], message))
              .setFooter(`For ${message.author.tag}`);
          msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          msg.edit(resultEmbed);
      });
    });
  },
};

function result(userR, botR, message) {
  if((userR === '✊' && botR === '✌️') ||
       (userR === '✋' && botR === '✊') ||
       (userR === '✌️' && botR === '✋')) {
        return '**' + message.author.tag + ' win!**';
    }
    else if(userR === botR)
    {
      return '**A tie!**';
    }
    else
    {
      return '**Bot win!**';
    }
}