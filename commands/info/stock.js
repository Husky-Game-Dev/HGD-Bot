const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
// https://www.alphavantage.co/documentation/#

module.exports = {
  name: 'stock',
  category: 'Info',
  description: 'Look up some stock',
  usage: '!husky stock <stock symbol>',
  async execute(message, args) {
    message.channel.send('Under construction');
    if(!args.length || args.length > 1) return message.reply('try ``!husky stock <stock symbol>``');
    let time = null, open = null, high = null, low = null, close = null, volume = null;
    const symbol = args.shift();
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHAKEY}`);
    const json = await response.json();
    for(const key in json['Time Series (5min)']) {
      time = key;
      open = json['Time Series (5min)'][key]['1. open'];
      high = json['Time Series (5min)'][key]['2. high'];
      low = json['Time Series (5min)'][key]['3. low'];
      close = json['Time Series (5min)'][key]['4. close'];
      volume = json['Time Series (5min)'][key]['5. volume'];
      console.log(`${time}, ${open}, ${high}, ${low}`);
      break;
    }
    const stockEmbed = new MessageEmbed()
    .setThumbnail(message.author.displayAvatarURL())
    .setTitle(time + ' 📈')
    .addFields(
        { name: 'Open', value: open, inline: true },
        { name: 'High', value: high, inline: true },
        { name: 'Low', value: low, inline: true },
        { name: 'Close', value: close, inline: true },
        { name: 'Volume', value: volume, inline: true },
      )
    .setFooter(`For ${symbol}`);
    message.channel.send(stockEmbed);
  },
};