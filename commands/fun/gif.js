const fetch = require('node-fetch');

module.exports = {
  name: 'gif',
  category: 'fun',
  description: 'Get a GIF from Tenor',
  async execute(message, args) {
    message.channel.send('GIF!');
    // !husky gif dog cat mouse
    // [dog, cat, mouse]
    let keywords = 'husky';
    if (args.length > 0) {
      keywords = args.slice(0, args.length).join(' ');
    }
    // content filer:
    // high - G
    // medium - G and PG
    // low - G, PG, and PG - 13
    // off - G, PG, PG - 13, and R(no nudity)
    const response = await fetch(`https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=medium`);
    const json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    message.channel.send(json.results[index].url);
  },
};