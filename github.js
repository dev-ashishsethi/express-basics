const express = require('express')
const axios = require('axios')


const fethcGitHubActivity = async (username) => {
  const url = `https://api.github.com/users/${username}/events/public`
  const response = await axios.get(url)
  return response.data
}

const app = express()

app.get('/', (req, res) => {
  const activity = fethcGitHubActivity("dev-ashishsethi")
  res.setHeader('content-type', 'text/html')
  res.send(

  )
})