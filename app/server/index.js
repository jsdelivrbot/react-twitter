require('dotenv').load();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan')('combined');
const compression = require('compression')();
const Twitter = require('node-tweet-stream');
const cors = require('cors');
const bodyParser = require('body-parser');

// Env Keys
const t = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	token: process.env.ACCESS_TOKEN_KEY,
	token_secret: process.env.ACCESS_TOKEN_SECRET
});

// Middleware.
app.use(morgan);
app.use(compression);
app.use(cors());
app.use(express.static('./app/static'));

// Socket.IO Stream
let term;

// Streaming
io.on('connection', socket => {
  socket.on('term', (data) => {
    t.language('en');

    t.track(data.term);

    if (term) {
      t.untrack(term);
      term = data.term;
    }

    t.on('tweet', tweet => {
      io.emit('tweet', tweet);
    })
    
    t.on('error', error => {
      console.log('STREAM ERROR:', error);
    });
  });

  socket.on('disconnect', () => {
    if (term) {
      t.untrack(term);
    }
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
