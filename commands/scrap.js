const Comic = require('../models/comic');
const scraper = require('../helpers/scraper')
const { getComic } = require('../helpers/comic')
const { sleep } = require('../helpers/tools')

module.exports = {
	name: 'scrap',
	execute(client, comment, args, db) {
		var i = args[0]
		console.log('SCRAP')
		console.log(i)
		if (i <= db.latest.num) {
			console.log('CHECK PASSED')
			if (i == db.latest.num) {
				db.kill = true
				fs.writeFile(process.env.JSONDB, JSON.stringify(db), (err) => {
					if (err) return log(err)
				});
			}
			console.log(db)
			var start = new Date().getTime();
			const num = db.latest.num

			scraper.scrap(i).then((e) => {
				console.log(e)
				getComic(i, db).then((c) => {
					console.log(c)
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
							console.log('Added ' + i)
						})
						.catch(err => console.log(err));
				})
			}).catch(err => console.log(err))
			console.log(i)
			var end = new Date().getTime();
			var time = end - start;
			console.log(`Successfuly scraped comic number ${i} and added it to the database! It took me ${time}ms`)
		}else console.log('CHECK FAILED')
	}
}
