const Comic = require('../models/comic');

module.exports = {
	name: 'search',
	aliases: ['s'],
	execute(client, comment, args, db) {

		const query = args.join(' ')
		const search = Comic.find({$text: {$search: query}})
		
		search.exec().then((comics) => {
			console.log(comics)
			const amount = comics.length
			const comic = comics[0]
			comment.reply(`${comic.title} #${comic.num} <br> ![](${comic.img}) <hr> <sub>Your search returned ${amount} comics, and I'm ${((1/amount)*100).toRound(2)}% sure you searched for this comic`)
			
		}).catch(err => {
			console.log(err)
			comment.reply('No results found!')
		})
	
	}
}
