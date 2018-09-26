const db = require('../db');

// Controller Methods
var getArtist = () => {
  // Query the database and get all the artists
  db.Artist.findAll({
    where: {
      id: 50
    }
  }).then(artists => {
    console.log('One Artist', artists);
  });
};

var getSong = () => {
  // Query the database and get all the artists
  console.log('GET SONG METHOD', db.Song);
  db.Song.findAll({
    where: {
      id: 20
    }
  }).then(song => {
    console.log('All song', song);
  });
};

var getAlbum = () => {
  // Query the database and get all the artists
  return db.Album.findAll({
    where: {
      id: 1
    }
  });
};

module.exports.getArtist = getArtist;
module.exports.getSong = getSong;
module.exports.getAlbum = getAlbum;
