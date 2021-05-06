const mongoose = require('mongoose');

// connect to database
mongoose.connect(process.env.MONG, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// models
const Data = require('../../models/data.js');

module.exports = {
  name: 'add',
  category: 'Trainning',
  description: 'Add point',
  perms: ['Officer', 'Core Officers', 'Executive Officers'],
  usage: '!husky add #point @user \n !husky add #point',
  execute(message, args, client) {

    let amount = args.shift();
    // check if add amount is a valid number
    if(!/^[0-9]+$/.test(amount)) {
      return message.reply('Try `!husky add #point @user`');
    }
    amount = parseInt(amount);
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
          point: amount,
        });
        newData.save().catch(err => console.log(err));
        return message.channel.send(`Added \`${amount}\` point to \`${user.username}\``);
      } else{
        data.point += amount;
        data.save().catch(err => console.log(err));
        return message.channel.send(`Added \`${amount}\` point to \`${user.username}\``);
      }

    });


  },
};