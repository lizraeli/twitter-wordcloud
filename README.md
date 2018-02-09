# Twitter Word Cloud

Generates a word cloud from a twitter timeline.

## Local Installation

The project contains both the server and client code. The server runs node

### Installing the Server Code

Install the server code and start the server from the root directory:

```bash
npm install
npm start
```

The server connects to the twitter API. This requires four a consumer key, consumer secret, access token key, and access_token_secret. Once you have obtained these, place them in `.env` file in the root directory as follows:

```text
consumer_key=...
consumer_secret=...
access_token_key=...
access_token_secret=...
```

### Installing the Client Code

The client code is located inside the `client/` directory.

```bash
cd client
npm install
npm start
```

### Tech

* Server: Node, Express, Twitter API
* Client: React, react-d3-cloud, Material UI React
