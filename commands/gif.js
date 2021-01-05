const fetch = require('node-fetch');

module.exports = {
  name: 'gif',
  description: 'Get a GIF from Tenor',
  async execute(message) {
    message.channel.send('GIF!');
    const tokens = message.content.split(' ');
    // !husky gif dog cat mouse
    // [!husky, gif, dog, cat, mouse]
    let keywords = 'husky';
    if (tokens.length > 2) {
      keywords = tokens.slice(2, tokens.length).join(' ');
    }

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