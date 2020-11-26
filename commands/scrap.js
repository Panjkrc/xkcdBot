const Comic = require('../models/comic');
const scraper = require('../helpers/scraper')
const { getComic } = require('../helpers/comic')
const { sleep } = require('../helpers/tools')

module.exports = {
	name: 'scrap',
	execute(client, comment, args, db) {
		if(comment !== 'undefined' || comment !== ''){
			if(!(db.owner.includes(comment.author.username))) return
		}

		var i = args[0]

		if (i <= db.latest.num) {
			var start = new Date().getTime();
			scraper.scrap(i).then((e) => {
				getComic(i, db).then((c) => {
					const newComic = new Comic({
						month: c.month,
						num: c.num,
						link: c.link,
						year: c.year,
						news: c.news,
						safe_title: c.safe_title,
						transcript: c.transcript,
						alt: c.alt,
						img: c.img,
						title: c.title,
						day: c.day,
						explanation: e
					})
					newComic.save()
						.then(() => {
							var end = new Date().getTime();
							var time = end - start;
							console.log(`Successfuly scraped comic number ${i} and added it to the database! It took me ${time}ms`)
						})
						.catch(err => console.log(err));
				})
			}).catch(err => console.log(err))

		} else console.log('CHECK FAILED')
	}
}
