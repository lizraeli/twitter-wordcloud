# Twitter Word Cloud

Generates a word cloud from a twitter timeline.

## Local Installation

The project contains a Node server and React client code.

### Installing the Server Code

Install the server code from the root directory:

```js
npm install
```

The server connects to the twitter API. This requires a consumer key, consumer secret, access token key, and access_token_secret. Once you have obtained these, place them in `.env` file in the root directory as follows:

```text
consumer_key=...
consumer_secret=...
access_token_key=...
access_token_secret=...
```

### Server Endpoint

* On a `GET` request to `/words/:handle`, the server will make its own request for up to 200 recent tweets (the APIs limit) from the timeline of the given handle. It will then transform the tweets into an array of words, and send this array as a reponse to the client.
* In production, the server will respond to a `GET` request to `/` with the `index.html` file from the `client/build/` folder. It will also serve other static assets contained in that folder.

### Installing the Client Code

The client code is located inside the `client/` directory.

```bash
cd client
npm install
```

### Development Mode

When developing the client code, start both the node server (on port `3001`) in the root folder, and the webpack-dev-server (on port `3000`) in the client folder. This will allows for hot-reloading of the client code. For ajax requests The webpack-dev-server server will work as a proxy between the client and the node server.

Hot-reloading of the node server code may be done with a global nodemon installation, by simply running `nodemon` in the root directory.

### Tech

* Server: Node, Express, Twitter API
* Client: React, react-d3-cloud, Material UI React
