const express = require('express')

const comments = require('./comments.json')
const app = express()
const { postRouter } = require('./router/postsRouter')
const { commentsRouter } = require('./router/commentsRouter')

app.use('/posts', postRouter)
app.use('/comments', commentsRouter)

app.listen(3001, () => {
	console.log('server started')
})
