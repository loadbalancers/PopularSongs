const csv = require('fast-csv');
const async = require('async');
const { albums_by_artist, songs_by_album } = require('./CassandraDatabase.js');
const fs = require('fs');

let currentAlbum = 0;
let currentArtist = null;
let artistAlbums = [];
let nextAlbum = null;

const creatorCargo = async.cargo((artist, cb) => {
  artist = artist[0];
  artist.albums.forEach(album => {
    let doc = {};
    doc.artistId = artist.id;
    doc.artistName = artist.name;
    doc.albumId = album.id;
    doc.albumName = album.name;
    doc.albumYear = album.year;
    doc.albumImage = album.image;
    console.log(doc.artistId, doc.artistId);
    let albumByArtist = new albums_by_artist(doc);
    albumByArtist.save();
  });
  cb();
}, 1);

const createArtist = (artist, albums) => {
  let newArtist = Object.assign({}, artist);
  newArtist.albums = [];
  albums.forEach(album => {
    album = Object.assign({}, album);
    newArtist.albums.push(album);
  });
  return newArtist;
};

const documentCargo = async.cargo((doc, cb) => {
  doc = doc[0];
  // IF DOC IS AN ARTIST
  if (doc.tag === 'artist') {
    currentArtist = doc;
    albumSender.resume();
    cb();
    // IF DOC IS A album
  } else {
    if (nextAlbum && nextAlbum.artistId === currentArtist.id) {
      artistAlbums.push(nextAlbum);
      nextAlbum = null;
    }
    if (doc.artistId === currentArtist.id) {
      artistAlbums.push(doc);
      albumSender.resume();
    } else {
      creatorCargo.push(createArtist(currentArtist, artistAlbums));
      currentArtist = null;
      artistAlbums = [];
      artistSender.resume();
      nextAlbum = doc;
    }
    cb();
  }
}, 1);

const artistSender = async.cargo((artist, cb) => {
  documentCargo.push(artist);
  artistSender.pause();
  cb();
}, 1);

const albumSender = async.cargo((album, cb) => {
  documentCargo.push(album);
  albumSender.pause();
  cb();
}, 1);

// PARSE ALL album FILES AND PUSH TO album SENDER
const readFile = file => {
  let parser = csv.parse();
  let albumReadStream = fs.createReadStream(file).pipe(parser);

  parser.on('readable', () => {
    while ((line = palbumarser.read())) {
      let album = {};
      album.id = parseInt(line[0]);
      album.name = line[1];
      album.year = parseInt(line[3]);
      album.image = line[2];
      album.artistId = parseInt(line[4]);
      album.tag = 'album';
      albumSender.push(album);
    }
    albumDirCargo.resume();
  });
};

const albumDirCargo = async.cargo((file, cb) => {
  let fileDir = __dirname + `/GeneratedData/Albums/AlbumData${file}.csv`;
  readAlbumFile(fileDir);
  albumDirCargo.pause();
  cb();
}, 1);

// PARSE ALL ALBUM FILES AND PUSH TO ARTIST SENDER
const readAlbumFile = file => {
  let parser = csv.parse();
  let albumReadStream = fs.createReadStream(file).pipe(parser);

  parser.on('readable', () => {
    while ((line = parser.read())) {
      let album = {};
      album.id = albumId++;
      album.name = line[0];
      album.image = line[1];
      album.publish = parseInt(line[2]);
      album.artistId = parseInt(line[3]);
      album.tag = 'album';
      albumSender.push(album);
    }
    albumDirCargo.resume();
  });
};

const albumDirCargo = async.cargo((file, cb) => {
  let fileDir = __dirname + `/albums${file}.csv`;
  readAlbumFile(fileDir);
  albumDirCargo.pause();
  cb();
}, 1);

// START PUSHING TO CARGOS
albumDirCargo.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
songDirCargo.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
