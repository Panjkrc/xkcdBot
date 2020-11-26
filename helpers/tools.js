const fs = require('fs')

module.exports = {
	hasCommand,
	getCommands,
	sleep
}

function hasCommand(commands, command) {
	return new Promise((resolve, reject) => {
		commands.forEach(c => {

			if (c.command.aliases) {
				c.command.aliases.forEach(alias => {
					if (command == alias) {
						resolve(c)
					}
				})
			}
			if (c.command.name == command) {
				resolve(c)
			}

		})
		reject(command)
	})
}

function getCommands() {
	var commands = []
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		commands.push({ command });
	}

	return commands
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}
