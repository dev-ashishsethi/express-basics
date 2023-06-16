// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const fs = require("fs");

// Creating an instance of express
const app = express();

// Middleware to parse the incoming request body
app.use(bodyParser.json());

// Read the existing URLs file
let urlsData = require("./urls.json");

// Route to shorten a URL
app.post("/shorten", (req, res) => {
  // Extract the URL from request body
  const originalUrl = req.body.url;

  // Check if the URL is present in the JSON data
  const foundUrl = urlsData.find((item) => item.original_url === originalUrl);

  if (foundUrl) {
    // If the URL is already present, return the existing record
    res.send(foundUrl);
  } else {
    // If not, create a new record
    const shortUrl = shortid.generate();

    // New URL object
    const newUrl = {
      original_url: originalUrl,
      short_url: shortUrl,
    };

    // Add the new URL to the array
    urlsData.push(newUrl);

    // Write the new array to the file
    fs.writeFileSync("./urls.json", JSON.stringify(urlsData));

    // Return the new URL record
    res.send(newUrl);
  }
});

// Route to redirect to the original URL
app.get("/:shortUrl", (req, res) => {
  // Extract the short URL from the request parameters
  const shortUrl = req.params.shortUrl;

  // Find the record with this short URL
  const foundUrl = urlsData.find((item) => item.short_url === shortUrl);

  if (foundUrl) {
    // If found, redirect to the original URL
    res.redirect(foundUrl.original_url);
  } else {
    // If not found, send an error message
    res.send({ error: "URL not found" });
  }
});

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));