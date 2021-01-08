const fetch = require('node-fetch');
// https://github.com/tronalddump-io/tronald-app

module.exports = {
  name: 'trumptweet',
  category: 'Fun',
  description: 'Get a random tweet from trump',
  async execute(message) {
    const tweet = await fetch('https://api.tronalddump.io/random/quote')
      .then(response => response.json())
      .then(response => response.value);
    message.channel.send(tweet);
  },
};