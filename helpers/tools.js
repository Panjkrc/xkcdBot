module.exports = {
	hasCommand,
}

function hasCommand(commands, command) {
	return new Promise((resolve, reject) => {
		commands.forEach(c => {
			if (c.command.name == command) {
				resolve(c)
			}
		})
		reject(command)
	})
}

