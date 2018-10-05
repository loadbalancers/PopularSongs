const Faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const async = require('async');
const csv = require('csv');

// Use node --max-old-space-size=15000

// Declare incrementing counts
var count = 1;
var i = 1;
var albumCount = 1;

// artist_id,album_id,album_image,album_name_artist_name
//${count},${i++},${Faker.random.image()},${Faker.commerce.productName()},${Faker.internet.userName()}

// Generate the fake data
var generateData = num => {
  var songs =
    'album_id,song_id,added_to_library,album_image,album_name,album_publish,song_length,song_name,song_popularity,song_streams,song_url\n';

  var artists =
    'artist_id,album_id,album_image,album_name,album_publish,artist_name\n';

  _.times(500000, () => {
    var albumName = Faker.commerce.productName();
    var albumImage = Faker.random.image();
    var artistName = Faker.internet.userName();
    _.times(10, () => {
      songs = songs.concat(
        `${count},${i++},${Faker.random.boolean()},${albumImage},${albumName},${Math.floor(
          Math.random() * (2018 - 1920 + 1)
        ) + 1920},${Math.floor(Math.random() * (300 - 210 + 1)) +
          210},${Faker.commerce.productName()},${Faker.random.number()},${Faker.random.number()},${Faker.random.image()}\n`
      );
    });
    _.times(3, () => {
      artists = artists.concat(
        `${count},${albumCount++},${albumImage},${albumName},${Math.floor(
          Math.random() * (2018 - 1920 + 1)
        ) + 1920},${artistName}\n`
      );
    });
    count++;
  });
  writeFile(songs, artists, num);
};

// Write File to csv
var writeFile = (songs, artists, num) => {
  var file = fs.createWriteStream(`song${num}.csv`);
  file.write(songs);
  file.end();

  var newfile = fs.createWriteStream(`artist${num}.csv`);
  newfile.write(artists);
  newfile.end();
};

var generator = async.cargo(function(tasks, callback) {
  generateData(tasks[0]);
  callback();
}, 1);

var array = [];

for (var j = 1; j < 61; j++) {
  array.push(j);
}

array.forEach(num =>
  generator.push(num, () => {
    console.log('Finished a task ', num);
  })
);
