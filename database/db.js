const Faker = require('faker');
const _ = require('lodash');
const Sequelize = require('sequelize');

const connection = new Sequelize('spotify', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Schema Definitions
const Artist = connection.define('artist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Album = connection.define('album', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publish: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const Song = connection.define('song', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  streams: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  length: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  popularity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  library: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

connection
  .authenticate()
  .then(() => {
    console.log('Connection established correctly');
  })
  .catch(err => {
    console.log('Unable to connect!!!', err);
  });

// Relationships
Artist.hasMany(Album);

Album.belongsTo(Artist);
Album.hasMany(Song);

Song.belongsTo(Album);

// connection.sync({ force: true }).then(() => {
//   _.times(1000, () => {
//     return Artist.create({
//       name: Faker.name.firstName()
//     }).then(artist => {
//       return artist
//         .createAlbum({
//           name: Faker.commerce.productName(),
//           img: Faker.random.image(),
//           publish: Faker.random.number()
//         })
//         .then(album => {
//           for (var i = 0; i < 10; i++) {
//             album.createSong({
//               name: Faker.commerce.productName(),
//               streams: Faker.random.number(),
//               length: Faker.random.number(),
//               popularity: Faker.random.number(),
//               library: Faker.random.boolean()
//             });
//           }
//         });
//     });
//   });
// });

module.exports.connection = connection;
module.exports.Artist = Artist;
module.exports.Album = Album;
module.exports.Song = Song;
