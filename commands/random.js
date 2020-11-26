const { getRandomComic } = require("../helpers/comic")

module.exports = {
	name: 'random',
	description: 'Returns random comic using https://c.xkcd.com/random/comic/',
	usage: process.env.PREFIX + ' random',
	aliases: ['r', 'ran', 'rand'],
	execute(client, comment) {
		getRandomComic().then(res => {
			comment.reply(`You requested random XKCD comic:  <br>  ![](${res.img})`);
		}).catch(err => {
			console.log(err)
		})	
	}
}