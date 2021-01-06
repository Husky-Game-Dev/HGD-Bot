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
fs.readdirSync('./commands/').forEach(dir => {
	const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
	for(const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		if(!command.name) continue;
		client.commands.set(command.name, command);
		console.log(command.name + ' added');
	}
});

client.on('message', message => {
	console.log(message.content);
	if (message.author.bot) return;
	if (message.content.indexOf(prefix) !== 0) return;

	// !husky command arg2 arg3...
	const args = message.content.slice(prefix.length + 1).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (!command.length) {
		return message.channel.send({ embed: invalidEmbed });
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.log(error);
		message.reply('there was an error trying to execute that command!');
	}
});

const invalidEmbed = {
	color: 0x0099ff,
	title: 'Error',
	url: 'https://huskygamedev.com',
	author: {
		name: 'Husky Game Dev',
		icon_url: 'https://i.imgur.com/xMskFdp.png',
		url: 'https://huskygamedev.com',
	},
	description: 'Not enough arguments',
	fields: {
		name: 'Code',
		value: '123x9'
	},
	image: {
		url: 'https://i.imgur.com/xMskFdp.png',
	},
	timestamp: new Date(),
	footer: {
		text: 'Bot error log'
	},
};
