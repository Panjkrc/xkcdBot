const Comic = require('../models/comic');
const scraper = require('../helpers/scraper')
const { getComic } = require('../helpers/comic')
const { sleep } = require('../helpers/tools')

module.exports = {
	name: 'scrap',
	execute(client, comment, args, db) {
		console.log(db)
		if (comment.author.username == db.owner) {
			console.log('OWNER')
			var start = new Date().getTime();

			const num = db.latest.num
			var i = 1
			for (i = 1; i < num; i++) {
				sleep(200)
				scraper.scrap(i).then((e) => {
					sleep(200)
					console.log(e)
					getComic(i, db).then((c) => {
						sleep(200)
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
								sleep(200)
								console.log('Added ' + i)
							})
							.catch(err => console.log(err));
					})

				}).catch(err => console.log(err))
				console.log(i)
				sleep(200)
			}
			var end = new Date().getTime();
			var time = end - start;
			comment.reply(`Successfuly scaped ${num} comics and added them to the database! It took me ${time / 1000}s`)
		} else {
			console.log('NOT OWNER')
		}
	}
}
message.channel.send({ embed }).then(newMessage => {
	setTimeout(function () {
		if (variable) {
			newMessage.delete()
		}
		return
	}, 4000);
}