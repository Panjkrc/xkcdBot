const fetch = require('node-fetch')
const { htmlToText } = require('html-to-text');

module.exports = {
	scrap
}

function scrap(num) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(`https://www.explainxkcd.com/wiki/api.php?action=parse&page=${num}&redirects&format=json`)
		const json = await response.json();
	
		const text = htmlToText(json.parse.text['*'], {
			wordwrap: false
		});
		var explanation = text.substring(text.indexOf('EXPLANATION'), text.indexOf('TRANSCRIPT'))
		explanation = explanation.substring(explanation.indexOf('\n'))
		resolve(explanation)
	})
	
}