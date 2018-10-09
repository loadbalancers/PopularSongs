const Faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const async = require('async');
const csv = require('csv');

// Songs
var writeFile = async () => {
  var songs = generateData();

  var data = await fs.writeFile('songs30.csv', songs, err => {
    if (err) {
      console.log('Error', err);
    }
    console.log('Success!');
  });
};

// Create fake data and put into a csv file
var generateData = () => {
  var songs = 'name, streams, length, popularity, library, albumId \n';
  var count = 29000000;
  _.times(1000000, () => {
    _.times(10, () => {
      songs = songs.concat(
        `${Faker.commerce.productName()}, ${Faker.random.number()}, ${Math.floor(
          Math.random() * (300 - 210 + 1)
        ) +
          210}, ${Faker.random.number()}, ${Faker.random.boolean()}, ${count}  \n`
      );
    });
    count++;
  });
  console.log(count);
  return songs;
};

writeFile();
