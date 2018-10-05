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

const artist = models.loadSchema('artist', {
  fields: {
    name: 'text',
    id: 'int'
  },
  key: ['id']
});

artist.syncDB(function(err, result) {
  if (err) {
    console.log('Error', err);
    return;
  }
  console.log('Artist Synced!');
});

const Songs_By_Album = models.loadSchema('songs_by_album', {
  fields: {
    album_id: 'int',
    album_name: 'text',
    album_image: 'text',
    album_publish: 'int',
    song_id: 'int',
    song_name: 'text',
    song_url: 'text',
    song_streams: 'int',
    song_length: 'int',
    song_popularity: 'int',
    added_to_library: 'boolean'
  },
  key: ['album_id', 'song_id']
});

// // Albums By Artist
const Albums_By_Artist = models.loadSchema('albums_by_artist', {
  fields: {
    artist_id: 'int',
    artist_name: 'text',
    album_id: 'int',
    album_name: 'text',
    album_image: 'text',
    album_publish: 'int'
  },
  key: ['artist_id', 'album_id']
});

// Sync tables
Songs_By_Album.syncDB(function(err, result) {
  if (err) throw err;
  console.log('Songs by album synced');
});
``;

Albums_By_Artist.syncDB(function(err, result) {
  if (err) throw err;
  console.log('Album by artist synced');
});

// var newSong = new models.modelInstance.songs_by_album({
//   album_id: Number(32),
//   album_name: 'SHIHKUNIN',
//   album_image: 'http://www.blahblah.com',
//   song_id: 32,
//   song_name: 'Fresh Beat',
//   song_url: 'http://www.blahblah.com',
//   song_streams: 88877,
//   song_length: 120,
//   song_popularity: 1231,
//   added_to_library: true
// });

// newSong = new models.modelInstance.songs_by_album({
//   album_id: Number(32),
//   album_name: 'SHIHKUNIN',
//   album_image: 'http://www.blahblah.com',
//   song_id: 34,
//   song_name: 'Boomerang',
//   song_url: 'http://www.blahblah.com',
//   song_streams: 88877,
//   song_length: 120,
//   song_popularity: 1231,
//   added_to_library: true
// });

// newSong.save(err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('SONG SAVED');
// });

// var newArtist = new models.modelInstance.albums_by_artist({
//   artist_id: 10,
//   artist_name: 'Madeon',
//   album_id: 20,
//   album_name: 'Fly Away',
//   album_image: 'http://www.dfsdfd.com'
// });

// newArtist.save(err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('SONG SAVED');
// });
