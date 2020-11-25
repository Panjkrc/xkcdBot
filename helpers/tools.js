module.exports = {
	hasCommand,
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

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}
