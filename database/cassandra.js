const cassandra = require('express-cassandra');

// CREATE CONNECTION
const models = cassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'spotify',
    queryOptions: { consistency: cassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe'
  }
});

const Songs_By_Album = models.loadSchema('songs_by_album', {
  fields: {
    albumId: 'int',
    albumName: 'text',
    albumImage: 'text',
    songId: 'int',
    songName: 'text',
    songUrl: 'text',
    songStreams: 'int',
    songLength: 'int',
    songPopularity: 'smallint',
    addedToLibrary: 'boolean'
  },
  key: ['albumId', 'songId']
});

// Albums By Artist
const Albums_By_Artist = models.loadSchema('albums_by_artist', {
  fields: {
    artistId: 'int',
    artistName: 'text',
    albumId: 'int',
    albumName: 'text',
    albumImage: 'text'
  },
  key: ['artistId', 'albumId']
});

// Sync tables
Songs_By_Album.syncDB(function(err, result) {
  if (err) throw err;
  console.log('Songs by album synced');
});

Albums_By_Artist.syncDB(function(err, result) {
  if (err) throw err;
  console.log('Album by artist synced');
});

var newSong = new models.modelInstance.songs_by_album({
  albumId: Number(32),
  albumName: 'SHIHKUNIN',
  albumImage: 'http://www.blahblah.com',
  songId: 32,
  songName: 'Fresh Beat',
  songUrl: 'http://www.blahblah.com',
  songStreams: 88877,
  songLength: 120,
  songPopularity: 1231,
  addedToLibrary: true
});

newSong.save(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('SONG SAVED');
});
