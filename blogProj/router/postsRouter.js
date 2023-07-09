const express = require('express')

const postRouter = express.Router()
const posts = require('../posts.json')
const comments = require('../comments.json')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

postRouter.get('/', (req, res) => {
	res.json(posts)
})

postRouter.get('/:id', (req, res) => {
	const post = posts.find((post) => post.id === parseInt(req.params.id))
	if (post) res.json(post)

	res.status(404).send('Post not found!')
})

postRouter.get('/:id/comments', (req, res) => {
	const comment = comments.filter(
		(singleComment) => singleComment.postId === parseInt(req.params.id),
	)

	if (comment) res.json(comment)

	res.status(404).json('no comments yet!!')
})

postRouter.use(bodyParser.json()).post('/postUpload', (req, res) => {
	const { title, body, userId } = req.body

	if (!title || !body || !userId) {
		res.status(400).send('missing paramers')
	} else {
		const newPost = {
			title,
			body,
			userId,
		}

		posts.push(newPost)
		fs.writeFileSync(
			path.resolve(__dirname, '../posts.json'),
			JSON.stringify(posts),
		)

		res.status(200).send(newPost)
	}
})

module.exports = { postRouter }
