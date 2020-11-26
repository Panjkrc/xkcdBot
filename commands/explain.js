const Comic = require('../models/comic');

module.exports = {
	name: 'explain',
	aliases: ['e', 'explanation'],
	execute(client, comment, args, db) {
		const num = args[0]
		if (num >= 1 && num <= db.latest.num) {
			Comic.findOne({ num: num }).exec((err, comic) => {
				if (err) {
					console.log(err)
					return
				}
				comment.reply(`${comic.explanation} <hr> <sub>Explanation taken from: [explainxkcd.com](https://www.explainxkcd.com/wiki/index.php/${num})</sub>`)
			})

		}
	}
}
