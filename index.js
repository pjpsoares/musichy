var request = require('request');
var express = require('express');
var app = express();

app.get('/music', function (req, res) {
  var options = {
    url: 'https://api.spotify.com/v1/search',
    headers: { 'User-Agent': 'request' },
    qs: {
      q: req.query.q,
      type: 'track'
    }
  };

  request(options, (error, response) => {
    if (error || response.statusCode !== 200) {
      console.error('something wrong');
      return;
    }

    var items = JSON.parse(response.body).tracks.items;
    var selectedIndex = Math.floor(Math.random() * items.length);
    var selectedTrack = items[selectedIndex].preview_url;

    console.log('selectedIndex', selectedIndex, selectedTrack);

    request(selectedTrack).pipe(res);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
