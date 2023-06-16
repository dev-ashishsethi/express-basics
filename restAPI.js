const express = require('express')
const posts = require('./posts.json')
const app = express()


app.get("/posts", (req, res) => {
  res.send(posts)
})

app.get("/posts/:id", (req, res) => {
  const posts = posts.forEach(post => post.id === req.id)
  res.send(posts)
})

app.listen(5000, () => {
  console.log("server started")
})