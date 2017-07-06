require('dotenv').load();

const express = require('express');
const app = express();
const morgan = require('morgan')('combined');
const compression = require('compression')();
const Twitter = require('twitter');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

// Env Keys
const client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// Middleware.
app.use(morgan);
app.use(compression);
app.use(cors());
app.use(express.static('./app/static'));

// Routes.
app.get('/tweets', (req, res) => {
  const {term, lat, lng} = req.query;

  client.get('search/tweets', {
    q: term,
    geocode: `${lat},${lng},100km`,
    count: 15,
    lang: 'en'
  }, (error, tweets, response) => {
    if (error) {
      console.log('error:', error);
    } else {
      res.json(tweets);
    }
  });
});

// Socket.IO Stream
const server = http.createServer(app).listen(3000, () => {
  console.log('Server listening on port 3000!');
});
const io = require('socket.io').listen(server);

let term = 'javascript';
let stream = client.stream('statuses/filter', {
  track: term,
  // locations: [lat,lng]
});

stream.on('error', (error) => {
  console.log('ERROR:', error);
});

stream.on('data', (data) => {
  if (data.id_str && data.text) {
    console.log(data.text);
    io.emit('tweet', data);
  }
});
