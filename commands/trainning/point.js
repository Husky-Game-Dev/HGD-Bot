const mongoose = require('mongoose');

// connect to database
mongoose.connect(process.env.MONG, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// models
const Data = require('../../models/data.js');

module.exports = {
  name: 'point',
  category: 'Trainning',
  description: 'Get your point',
  perms: 'Officer',
  usage: '!husky point',
  execute(message, args, client) {

    let user = message.author;
    // check for mention
    if(args[0]) {
      user = message.mentions.users.first() || client.users.cache.get(args[0]);
    }
    // cant find user
    if(!user) return message.reply(`Can't find user \`${args[0]}\``);

    Data.findOne({
      userID: user.id,
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newData = new Data({
          name: user.tag,
          userID: user.id,
          point: 0,
        });
        newData.save().catch(err => console.log(err));
        return message.channel.send(`\`${user.username}\` has \`0\` point`);
      } else{
        return message.channel.send(`\`${user.username}\` has \`${data.point}\` point`);
      }

    });


  },
};