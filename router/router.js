const express = require('express')
const posts = require('./posts.json')
const postRouter = express.Router()


postRouter.get("/posts", (req, res) => {
  res.send(posts)
})

postRouter.get("/posts/:id", (req, res) => {
  const posts = posts.forEach(post => post.id === req.id)
  res.send(posts)
})

postRouter.listen(5000, () => {
  console.log("server started")
})