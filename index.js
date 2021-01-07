const fs = require('fs');
const Canvas = require('canvas');
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
		client.commands.set(command.name, command);
		console.log(command.name + ' added');
	}
});

client.on('ready', () => {
	Canvas.registerFont('./assets/fonts/GiantRobotArmy-Medium.ttf', { family: 'giant-robot' });
	console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
				status: 'online',
        activity: {
            name: '!husky help',
            type: 'WATCHING',
        }
		})
		.catch(console.error);
});

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	if (!channel) return;
	// Set a new canvas to the dimensions of 850x450 pixels
	const canvas = Canvas.createCanvas(850, 450);
	// ctx (context) will be used to modify a lot of the canvas
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./assets/welcomeLogo.png');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome ' + member.displayName, canvas.width / 20, canvas.height / 1.8);
	ctx.fillText('to the server!', canvas.width / 20, canvas.height / 1.42);
	ctx.beginPath();
	ctx.arc(105, 105, 80, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	// Move the image downwards vertically and constrain its height to 200, so it's a square
	ctx.drawImage(avatar, 25, 25, 160, 160);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer());
	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on('message', message => {
	console.log(message.content);
	if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member);
	}
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

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 60;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px giant-robot`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

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
