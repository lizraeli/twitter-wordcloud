// require "dotenv" to access process.env variables from the local .env file
require("dotenv").config();

const path = require("path");
const Twitter = require("twitter");
const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("tiny"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

const twitterCli = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

const getWords = (req, res) => {
  const params = {
    screen_name: req.params.handle,
    trim_user: true,
    exclude_replies: true,
    count: 200
  };

  twitterCli
    .get("statuses/user_timeline", params)
    .then(tweets => {
      console.log(`got ${tweets.length} tweets`);
      const words = tweets.reduce(
        (arr, tweet) => [...arr, ...tweet.text.split(" ")],
        []
      );
      res.send(words);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ text: "could not fetch tweets" });
    });
};

app.get("/words/:handle", getWords);

// For any request that doesn't match the one above,
// send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
