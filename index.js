const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const shortid = require('shortid')
const urlData = require('./urls.json')
const fs = require('fs')
app
	.use(bodyParser.json())
	.get('/:shortURL', (req, res) => {
		const { shortURL } = req.params
		const foundUrlObj = urlData.find((obj) => obj?.short_url === shortURL)
		console.log('foundUrlObj', foundUrlObj)
		if (foundUrlObj) {
			res.redirect(foundUrlObj.url)
		} else {
			res.send('No url found')
		}
	})
	.post('/shorten', (req, res) => {
		const shortURL = shortid.generate()
		const obj = {}
		obj['url'] = req.body.url
		obj['short_url'] = shortURL

		urlData.push(obj)
		console.log(urlData)
		fs.writeFileSync('urls.json', JSON.stringify(urlData))
		res.send(shortURL).status(200)
	})
	.listen(3000, () => {
		console.log('server started')
	})
