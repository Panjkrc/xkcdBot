const { getCommands } = require('../helpers/tools');
const Comic = require('../models/comic');

module.exports = {
	name: 'help',
	description: 'Help utility for xkcdBot',
	usage: process.env.PREFIX + ' help [Command]',
	aliases: ['h'],
	execute(client, comment, args, db) {
		if (args.length == 0) {
			const commands = getCommands()
			var message = '##### List of all comands: <hr>'
			commands.forEach(c => {
				message.concat(`<br>* ${c.command.name}`)
			})
			message.concat(' <br> <hr> Run `!xkcd help command_name` to get help on specific command')
			comment.reply(message)


		} else {
			const command = args[0]
			const c = hasCommand(getCommands(), command)

			var message = `Command ${command} details: <hr> * Description: ${c.command.description} <br> * Usage: \`${c.command.usage}\` <br>`
			if( c.command.aliases !== 'undefined' && c.command.aliases.length !== 0){
				message.concat(`Aliases: `)
				c.command.aliases.forEach(a => {
					message.concat(`\`${a}\` `)
				})
			}
			comment.reply(message)

		}
	}
}
