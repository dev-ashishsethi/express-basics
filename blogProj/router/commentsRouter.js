const express = require('express')
const commentsRouter = express.Router()

const comments = require('../comments.json')

commentsRouter.get('/', (req, res) => {
	res.json(comments)
})
commentsRouter.get('/findbyemail/:email', (req, res) => {
	const commentsByEmail = comments.filter(
		(comment) => comment.email === req.params.email,
	)
	if (commentsByEmail) res.json(commentsByEmail)
	res.status(404).json('comments not found')
})

module.exports = { commentsRouter }
