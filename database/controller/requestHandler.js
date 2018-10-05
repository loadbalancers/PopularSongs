const db = require('../db');

// Controller Methods
// GET REQUEST
var getAllArtists = () => {
  return db.Artist.findAll({
    limit: 100
  });
};

var getArtist = async artistId => {
  var artist = await db.Artist.findAll({
    where: {
      id: artistId
    }
  }).then(data => data[0].dataValues);

  var albums = await getAlbum(artistId).then(data => {
    // Loop through the data array and for each album
    // Get the songs for that particular album based on the id
    // Append the songs to the album
    data.forEach(async album => {
      var albumID = album.dataValues.id;
      var songs = await getSongs(albumID).then(song => {
        return song;
      });
      album.dataValues.songs = songs;
    });

    return data;
  });
  var songs = await getSongs(artistId).then(data => data);
  var albumsList = [];

  albumsList.push(albums);
  artist.albums = albumsList;

  return artist;
};

var getSongs = albumId => {
  // Query the database and get all the artists
  return db.Song.findAll({
    where: {
      albumId: albumId
    }
  });
};

var getAlbum = artistId => {
  // Query the database and get all the artists
  return db.Album.findAll({
    where: {
      artistId: artistId
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

var deleteSong = songId => {
  db.Song.destroy({
    where: {
      id: songId
    }
  });
};

var deleteAlbum = albumId => {
  db.Album.destroy({
    where: {
      id: albumId
    }
  });
};

module.exports.getArtist = getArtist;
module.exports.getAllArtists = getAllArtists;
module.exports.getSongs = getSongs;
module.exports.getAlbum = getAlbum;
module.exports.createArtist = createArtist;
module.exports.updateArtist = updateArtist;
module.exports.deleteArtist = deleteArtist;
module.exports.deleteSong = deleteSong;
module.exports.deleteAlbum = deleteAlbum;
