const { getCommands, hasCommand } = require('../helpers/tools');
const Comic = require('../models/comic');

module.exports = {
	name: 'help',
	description: 'Help utility for xkcdBot',
	usage: process.env.PREFIX + ' help [Command]',
	aliases: ['h'],
	execute(client, comment, args, db) {

		if (args.length == 0) {
			const commands = getCommands()
			var message = '<h6>List of all comands:</h6> <hr>'
			commands.forEach(c => {
				message = message.concat(`• ${c.command.name}<br>`)
			})
			message = message.concat(`<br><hr>Run <code>!xkcd help command_name</code> to get help on specific command`)
			comment.reply(message)


		} else {
			const command = args[0]
			const commands = getCommands()

			hasCommand(commands, command).then(c => {
				var message = `Command <code>${command}</code> details: <hr>• Description: ${c.command.description} <br>• Usage: <code>${c.command.usage}</code> <br>`
				if (c.command.aliases !== 'undefined' && c.command.aliases.length !== 0) {
					message = message.concat(`• Aliases: `)
					c.command.aliases.forEach(a => {
						message = message.concat(`<code>${a}</code>`)
					})
				}
				comment.reply(message)
			})




		}
	}
}
