require('newrelic');
const express = require('express');
const cache = require('express-redis-cache')();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const requestHandler = require('../database/controller/requestHandler');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const connection = require('../database/db');

// Clustering
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork Workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public/')));

  app.get('/artist/:id', cache.route(), function(req, res) {
    let artistID = parseInt(req.params.id, 10);

    requestHandler.getArtist(artistID).then(data => {
      res.send(data);
    });
  });

  app.get('/artists', (req, res) => {
    requestHandler.getAllArtists().then(data => res.send(data));
  });

  // GET
  app.get('/artist/:id', function(req, res) {
    var artistId = req.params.id;
    var artist = requestHandler.getArtist(artistId);

    artist.then(artist => {
      res.send(artist[0].dataValues);
    });
  });

  app.get('/album/:id', function(req, res) {
    var albumId = req.params.id;
    var album = requestHandler.getAlbum(albumId);

    album.then(album => {
      res.send(album[0].dataValues);
    });
  });

  app.get('/song/:id', function(req, res) {
    var songId = req.params.id;
    var song = requestHandler.getSong(songId);

    song.then(song => {
      res.send(song[0].dataValues);
    });
  });

  // POST
  app.post('/artist', function(req, res) {
    var artist = req.body;

    requestHandler.createArtist(artist);
    res.send('created');
  });

  // UPDATE
  app.put('/artist/:id', function(req, res) {
    var artistId = req.params.id;
    var artist = req.body;

    requestHandler.updateArtist(artistId, artist);

    res.send('artist put request');
  });

  // DELETE
  app.delete('/artist/:id', function(req, res) {
    var artistId = req.params.id;
    requestHandler.deleteArtist(artistId);

    res.send('artist delete request');
    console.log('DELETE REQUEST RECEIVED');
  });

  app.delete('/album/:id', function(req, res) {
    var albumId = req.params.id;
    requestHandler.deleteAlbum(albumId);

    res.send('album delete request');
    console.log('DELETE REQUEST RECEIVED');
  });

  app.delete('/song/:id', function(req, res) {
    var songId = req.params.id;
    requestHandler.deleteSong(songId);

    res.send('song delete request');
    console.log('DELETE REQUEST RECEIVED');
  });

  const PORT = 3003;

  app.listen(PORT, function() {
    console.log(`listening on port ${PORT}!`);
  });

  console.log(`Worker ${process.pid} started`);
}
