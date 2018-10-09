const Faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const async = require('async');
const csv = require('csv');

// var writeFile = async () => {
//   var artists = generateData();

//   var data = await fs.writeFile('artists.csv', artists, err => {
//     if (err) {
//       console.log('Error', err);
//     }
//     console.log('Success!');
//   });
// };

// // Create fake data and put into a csv file
// // Use node --max-old-space-size=15000
// var generateData = () => {
//   var artists = 'name \n';
//   _.times(10000000, () => {
//     artists = artists.concat(`${Faker.commerce.productName()} \n`);
//   });
//   return artists;
// };

// writeFile();

// ALBUMS;
var writeFile = async () => {
  var albums = generateData();

  var data = await fs.writeFile('albums10.csv', albums, err => {
    if (err) {
      console.log('Error', err);
    }
    console.log('Success!');
  });
};

// Create fake data and put into a csv file
var generateData = () => {
  var albums = 'name, img, publish, artistId \n';
  var count = 9000000;
  _.times(1000000, () => {
    _.times(3, () => {
      var randomNumber = Math.floor(Math.random() * (1000 - 0) + 0);
      var randomImage = `https://s3-us-west-1.amazonaws.com/spotifyimages/${randomNumber}.jpg`;
      albums = albums.concat(
        `${Faker.commerce.productName()}, ${randomImage}, ${Faker.random.number()}, ${count}  \n`
      );
    });
    count++;
  });
  console.log('Final Count', count);
  return albums;
};

writeFile();
