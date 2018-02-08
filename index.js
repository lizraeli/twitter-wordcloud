// require "dotenv" to access process.env variables from the local .env file
require("dotenv").config();

const Twitter = require("twitter");
const express = require("express");
const app = express();

const stopwords = require("./stopwords");

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
    count: 500
  };

  twitterCli
    .get("statuses/user_timeline", params)
    .then(tweets => {
      const words = tweets
        .reduce((arr, tweet) => [...arr, ...tweet.text.split(" ")], [])
        .filter(word => !stopwords.includes(word));

      const wordsWithCount = words.reduce(
        (dict, word) =>
          word in dict
            ? { ...dict, [word]: dict[word] + 1 }
            : { ...dict, [word]: 1 },
        Object.create(null)
      );

      console.log(wordsWithCount);
      res.send(wordsWithCount);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

app.get("/:handle", getWords);

app.listen(3001, () => console.log("Server Listening"));
