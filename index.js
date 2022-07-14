const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Lyrics Scrapper Working");
});

app.get("/lyrics", async (req, res) => {
  const { q } = req.query;

  request(`https://gaana.com/lyrics/${q}`, function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

    // Print the HTML for the Google homepage.
    const $ = cheerio.load(body);
    let lyric_container = $("div.lyr_data > ._inner > p");
    console.log(lyric_container.text());
    res.send(lyric_container.text());
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
