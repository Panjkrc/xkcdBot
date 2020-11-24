const fetch = require('node-fetch')

module.exports = {
	getComic,
	getLatestComic,
	getRandomComic
}

function getComic(num) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(`https://xkcd.com/${num}/info.0.json`)
		const json = await response.json();
		resolve(json)
	})
}

function getLatestComic() {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(`https://xkcd.com/info.0.json`)
		const json = await response.json();
		resolve(json)
	})
}

function getRandomComic() {
	return new Promise(async (resolve, reject) => {
		var response = await fetch(`https://c.xkcd.com/random/comic/`)
		const random = response.url.concat('info.0.json')
		response = await fetch(random)
		const json = await response.json();
		resolve(json)
	})
}
