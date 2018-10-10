const Faker = require('faker');
const _ = require('lodash');
const Sequelize = require('sequelize');

const connection = new Sequelize({
  username: 'root',
  password: 'muzBost&i3^meoW7bowWow',
  database: 'spotify',
  host: '54.67.71.21',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 1000000,
    idle: 1000000
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
    allowNull: true
  },
  publish: {
    type: Sequelize.INTEGER,
    allowNull: true
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

// connection
//   .authenticate()
//   .then(() => {
//     console.log('Connection established correctly');
//   })
//   .catch(err => {
//     console.log('Unable to connect!!!', err);
//   });

// Relationships
Artist.hasMany(Album);

Album.belongsTo(Artist);
Album.hasMany(Song);

Song.belongsTo(Album);

// var generateFakeDate = () => {
//   _.times(1, () => {
//     Artist.create({
//       name: Faker.name.firstName()
//     }).then(artist => {
//       artist
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
// };

Artist.sync().then(() => {});
Song.sync().then(() => {});
Album.sync().then(() => {});

module.exports.connection = connection;
module.exports.Artist = Artist;
module.exports.Album = Album;
module.exports.Song = Song;
