const db = require('../db');

// Controller Methods

// GET REQUEST
var getArtist = artistId => {
  // Query the database and get all the artists
  return db.Artist.findAll({
    where: {
      id: artistId
    }
  });
};

var getSong = songId => {
  // Query the database and get all the artists
  return db.Song.findAll({
    where: {
      id: songId
    }
  });
};

var getAlbum = albumId => {
  // Query the database and get all the artists
  return db.Album.findAll({
    where: {
      id: albumId
    }
  });
};

// POST REQUEST
var createArtist = artist => {
  console.log('ARTIST IN REQUEST HANDLER', artist);
  // Post request
  db.Artist.create({
    name: artist.name
  });
};

// PUT REQUEST
var updateArtist = (artistId, artist) => {
  var artistName = artist.name;
  console.log('NEW ARTIST NAME', artistName);

  db.Artist.update(
    {
      name: artistName
    },
    {
      where: {
        id: artistId
      }
    }
  );
};

// DELETE REQUEST
var deleteArtist = artistId => {
  db.Artist.destroy({
    where: {
      id: artistId
    }
  });
};

module.exports.getArtist = getArtist;
module.exports.getSong = getSong;
module.exports.getAlbum = getAlbum;
module.exports.createArtist = createArtist;
module.exports.updateArtist = updateArtist;
module.exports.deleteArtist = deleteArtist;
