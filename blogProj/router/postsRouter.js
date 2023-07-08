const express = require('express')

const postRouter = express.Router
const posts = require('../posts.json')
const comments = require('../comments.json')

postRouter.get('/posts', (req, res) => {
	res.json(posts)
})

postRouter.get('/post/:id', (req, res) => {
	const post = posts.find((post) => post.id === parseInt(req.params.id))
	if (post) res.json(post)

	res.status(404).send('Post not found!')
})

postRouter.get('/post/:id/comments', (req, res) => {
	const comment = comments.filter(
		(singleComment) => singleComment.postId === parseInt(req.params.id),
	)

	if (comment) res.json(comment)

	res.status(404).json('no comments yet!!')
})

postRouter.get('/comments', (req, res) => {
	res.json(comments)
})

postRouter.get('/comments/findbyemail/:email', (req, res) => {
	const commentsByEmail = comments.filter(
		(comment) => comment.email === req.params.email,
	)

	if (commentsByEmail) res.json(commentsByEmail)
	res.status(404).json('comments not found')
})
