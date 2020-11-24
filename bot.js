const Ruqqus = require('ruqqus-js')
const fs = require('fs')
const { hasCommand } = require('./helpers/tools')
const { getComic, getLatestComic } = require('./helpers/comic')
require('dotenv').config();
const chalk = require('chalk');
const log = console.log;

const prefix = process.env.PREFIX

const client = new Ruqqus.Client({
	id: process.env.CLIENT_ID,
	token: process.env.CLIENT_SECRET,
	refresh: process.env.REFRESH_TOKEN,
	agent: process.env.AGENT,

})

var commands = []

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push({ command });
	log(`Registered command: ${command.name}`)
}

client.on('comment', (comment) => {
	const commentText = comment.content.text
	if (commentText.startsWith(prefix)) {
		log(`${chalk.red('COMMENT')}: ${chalk.greenBright(comment.content.text)} - ${chalk.red('AUTHOR')}: ${chalk.greenBright(comment.author.username)} - ${chalk.red('GUILD')}: +${chalk.greenBright(comment.post.guild.name)} - ${chalk.red('POST')}: ${chalk.greenBright(comment.post.full_link)}`)
		const content = commentText.substring(prefix.length + 1, commentText.length)
		if (!(content.length > 1)) {
			getLatestComic().then((res) => {
				comment.reply(`Here is the latest XKCD comic:  <br>  ![](${res.img})`);
			})

		}
		else if (!isNaN(Number(content))) {
			getComic(content).then((res) => {
				comment.reply(`You requested XKCD comic number ${content}, here it is:  <br>  ![](${res.img})`);
			})

		}
		else {
			const args = content.trim().split(/ +/);
			const command = args.shift().toLowerCase();

			hasCommand(commands, command, args)
				.then(c => {
					c.command.execute(client, comment)
				})
				.catch(c => {
					log(`Invalid command ${c}`)
				})
		}
	}
})

process.on('unhandledRejection', (error) => {
	if (!Boolean(process.env.PRODUCTION)) {
		log(error)
	}
	return
})

/* Check for new xkcd every day */
setInterval(() => {
	getLatestComic().then(res => {
		var db = JSON.parse(fs.readFileSync(process.env.JSONDB).toString());
		if (db.latest.num < res.num) {
			db.latest.num = res.num
		
			client.guilds.fetch('xkcd').then(guild => {
				guild.post(`${res.title} #${res.num}`, { body: `${res.alt}<br>  <hr>  <br>Date: ${res.month}/${res.day}/${res.year}<br>https://xkcd.com/${res.num}`, url: res.img })
				log('Posted new XKCD')
			});

			fs.writeFile(process.env.JSONDB, JSON.stringify(db), (err) => {
				if(err) return log(err)
			});

		}

	})

},/* 86400000*/ 10000)



