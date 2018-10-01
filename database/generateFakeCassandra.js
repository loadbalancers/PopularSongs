const Faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const async = require('async');
const csv = require('csv');

var writeFile = async () => {
  var artists = generateData();

  var data = await fs.writeFile('songsCassandra.csv', artists, err => {
    if (err) {
      console.log('Error', err);
    }
    console.log('Success!');
  });
};

// Create fake data and put into a csv file
// Use node --max-old-space-size=15000

var generateData = () => {
  var artists =
    'album_id,album_name,album_image,song_id,song_name,song_url,song_streams,song_length,song_popularity,added_to_library\n';
  var count = 1;
  var i = 1;

  _.times(1, () => {
    var albumName = Faker.commerce.productName();
    var albumImage = Faker.random.image();
    _.times(10, () => {
      artists = artists.concat(
        `${count},${albumName},${albumImage},${i++},${Faker.commerce.productName()},${Faker.random.image()},${Faker.random.number()},${Math.floor(
          Math.random() * (300 - 210 + 1)
        ) + 210},${Faker.random.number()},${Faker.random.boolean()}\n`
      );
    });

    count++;
  });
  return artists;
};

writeFile();

// Albums_With_Artists
// var generateData = () => {
//   var artists = 'artist_id,album_id,album_image,album_name,_artist_name\n';
//   var count = 1;
//   _.times(1000000, () => {
//     artists = artists.concat(
//       `${count},${count},${Faker.random.image()},${Faker.commerce.productName()},${Faker.internet.userName()}\n`
//     );
//     count++;
//   });
//   return artists;
// };

// writeFile();
