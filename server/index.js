const express = require('express');
const bodyParser = require('body-parser');
const Artist = require('../database/index');
const connection = require('../database/db');
const path = require('path');
const cors = require('cors');
const requestHandler = require('../database/controller/requestHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

// app.get('/artist/:id', function(req, res) {
//   let artistID = parseInt(req.params.id, 10);

//   Artist.findOne({ id: artistID })
//     .then(artist => res.json(artist))
//     .catch(err => console.log(err));
// });

// GET
app.get('/artist/:id', function(req, res) {
  // requestHandler.getArtist();
  // requestHandler.getAlbum();
  var album = requestHandler.getAlbum();
  album.then(album => {
    res.send(album[0].dataValues);
  });

  // let artistID = parseInt(req.params.id, 10);

  // Artist.findOne({ id: artistID })
  //   .then(artist => res.json(artist))
  //   .catch(err => console.log(err));
});

app.get('/album/:id', function(req, res) {
  res.send('Received album get request');
});

app.get('/song/:id', function(req, res) {
  res.send('Received song get request');
});

// POST
app.post('/artist', function(req, res) {
  let update = {};
  var objProp = `albums.${req.body.albumID}.songs.${req.body.songID}.library`;
  update[objProp] = !!parseInt(req.body.added, 10);

  Artists.findOneAndUpdate({ id: req.body.artistID }, { $set: update })
    .then(() =>
      res.json({ message: 'success', added: !!parseInt(req.body.added, 10) })
    )
    .catch(() => res.status(400).json({ message: 'bad request' }));
});

app.post('/artist/:id', function(req, res) {
  res.send('artist post request');
  console.log('POST REQUEST RECEIVED');
});

// UPDATE
app.put('/artist/:id', function(req, res) {
  res.send('artist put request');
  console.log('PUT REQUEST RECEIVED');
});

app.put('/album/:id', function(req, res) {
  res.send('album put request');
  console.log('PUT REQUEST RECEIVED');
});

app.put('/song/:id', function(req, res) {
  res.send('song put request');
  console.log('PUT REQUEST RECEIVED');
});

// DELETE
app.delete('/artist/:id', function(req, res) {
  res.send('artist delete request');
  console.log('DELETE REQUEST RECEIVED');
});

app.delete('/album/:id', function(req, res) {
  res.send('album delete request');
  console.log('DELETE REQUEST RECEIVED');
});

app.delete('/song/:id', function(req, res) {
  res.send('song delete request');
  console.log('DELETE REQUEST RECEIVED');
});

const PORT = 3003;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
