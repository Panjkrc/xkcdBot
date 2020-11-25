module.exports = {
	name: 'uptime',
	aliases: ['u', 'up'],
	execute(client, comment) {
		comment.reply(`Bot uptime: ${client.uptime}`);
		console.log(`Bot uptime: ${client.uptime}`)

	}
}