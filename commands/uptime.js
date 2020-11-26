module.exports = {
	name: 'uptime',
	description: 'Bot\'s uptime',
	usage: process.env.PREFIX + '  uptime',
	aliases: ['u', 'up'],
	execute(client, comment) {
		comment.reply(`Bot uptime: ${client.uptime}`);
		console.log(`Bot uptime: ${client.uptime}`)

	}
}