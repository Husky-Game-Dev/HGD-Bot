const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const config = {
	token: process.env.TOKEN,
	prefix: process.env.PREFIX,
	tenorkey: process.env.TENORKEY,
};
const prefix = config.prefix;

client.once('ready', () => {
	console.log('Ready!');
});

client.login(config.token);

// load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(command.name + ' added');
}

client.on('message', message => {
	console.log(message.content);

	if (message.author.bot) return;
	if (message.content.indexOf(prefix) !== 0) return;

	// xxx command arg2 arg3...
	const args = message.content.slice(prefix.length + 1).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	console.log(command);

	if (!command.length) {
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Error')
			.setURL('https://huskygamedev.com')
			.setAuthor('Husky Game Dev', 'https://huskygamedev.com/assets/img/HGD_logo_final.png,', 'https://huskygamedev.com')
			.setDescription('Not enough arguments.')
			.setFooter('Bot error log')
			.addField('Code', '123x9', true)
			.setTimestamp()
			.setImage('https://huskygamedev.com/assets/img/HGD_logo_final.png');
		console.log(!args.length);
		return message.channel.send(embed);
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.log(error);
		message.reply('there was an error trying to execute that command!');
	}
});