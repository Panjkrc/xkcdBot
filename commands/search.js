const Comic = require('../models/comic');

module.exports = {
	name: 'search',
	description: 'Returns comic that best matched requested search query, NOTE: typo sensitive (search is not [elastic](https://www.elastic.co/what-is/elasticsearch))',
	usage: process.env.PREFIX + ' search [String]',
	aliases: ['s'],
	execute(client, comment, args, db) {

		if (args.length == 0) {
			comment.reply('You didn\'t say what to search for!')
			return
		}

		const query = args.join(' ')
		const search = Comic.find({ $text: { $search: query } })

		search.exec().then((comics) => {
			const amount = comics.length
			const comic = comics[0]
			comment.reply(`${comic.title} #${comic.num} <br> ![](${comic.img}) <hr> <sub>Your search returned ${amount} comics, and I'm ${(1 / amount) * 100}% sure you searched for this comic`)

		}).catch(err => {
			console.log(err)
			comment.reply('No results found!')
		})

	}
}
