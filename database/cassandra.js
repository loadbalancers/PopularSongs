const cassandra = require('express-cassandra');

// Cassandra
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
// -------------------------------------------
// SCHEMAS & TYPES
// -------------------------------------------
// SONG TYPE
const Song = function(
  id,
  name,
  url,
  streams,
  length,
  popularity,
  added = false
) {
  this.id = id;
  this.name = name;
  this.url = url;
  this.streams = streams;
  this.length = length;
  this.popularity = popularity;
  this.addedToLibrary = added;
};
// ALBUM TYPE
const Album = function(id, songs, name, image, releaseYear) {
  this.id = id;
  this.songs = songs;
  this.name = name;
  this.image = image;
  this.releaseYear = releaseYear;
};
// ARTIST TYPE
const Artist = models.loadSchema('artist', {
  fields: {
    id: 'int',
    name: 'text',
    albums: { type: 'set', typeDef: '<FROZEN<album>>' }
  },
  key: ['id']
});

// CREATE ARTIST TABLE
Artist.syncDB(function(err, result) {
  if (err) throw err;
  console.log('YAY!');
});

// TEST DATA
let songOne = new Song(1, 'song1', 'song1', 1, 1, 1, false);
let songTwo = new Song(2, 'song2', 'song2', 1, 1, 1, false);
let songThree = new Song(3, 'song3', 'song3', 1, 1, 1, false);
let songFour = new Song(4, 'song4', 'song4', 1, 1, 1, false);
let albumOne = new Album(1, [songOne, songTwo], 'albumOne', 'test1', 1);
let albumTwo = new Album(2, [songThree, songFour], 'albumTwo', 'test2', 2);

const Jake = new models.instance.artist({
  id: 0,
  name: 'Jake Smith',
  albums: [albumOne, albumTwo]
});

Jake.save(err => {
  if (err) console.log(err);
  else console.log('Yuppiie!');
});
