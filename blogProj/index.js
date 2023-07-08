const express = require('express')

const posts = require('./posts.json')
const comments = require('./comments.json')
const app = express()

app
	.get('/posts', (req, res) => {
		res.json(posts)
	})
	.get('/post/:id', (req, res) => {
		const post = posts.find((post) => post.id === parseInt(req.params.id))
		if (post) res.json(post)

		res.status(404).send('Post not found!')
	})
	.get('/post/:id/comments', (req, res) => {
		const comment = comments.filter(
			(singleComment) => singleComment.postId === parseInt(req.params.id),
		)

		if (comment) res.json(comment)

		res.status(404).json('no comments yet!!')
	})
	.get('/comments', (req, res) => {
		res.json(comments)
	})
	.get('/comments/findbyemail/:email', (req, res) => {
		const commentsByEmail = comments.filter(
			(comment) => comment.email === req.params.email,
		)

		if (commentsByEmail) res.json(commentsByEmail)
		res.status(404).json('comments not found')
	})
	.listen(3001, () => {
		console.log('server started')
	})
