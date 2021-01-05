const fs = require('fs');
require('dotenv').config();
const {
	prefix,
} = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});
client.login(process.env.TOKEN);

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

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.log(error);
		message.reply('there was an error trying to execute that command!');
	}

});