const fetch = require('node-fetch')

module.exports = {
	hasCommand,
	getComic,
	getLatestComic,
	getRandomComic
}

function hasCommand(commands, command) {
	return new Promise((resolve, reject) => {
		commands.forEach(c => {
			if (c.command.name == command) {
				resolve(c)
			}
		})
		reject(command)
	})
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
