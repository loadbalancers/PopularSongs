const Faker = require('faker');
const _ = require('lodash');
const fs = require('fs');

// Create fake data and put into a csv file
_.times(100000, () => {
  return Artist.create({
    name: Faker.name.firstName()
  }).then(artist => {
    return artist
      .createAlbum({
        name: Faker.commerce.productName(),
        img: Faker.random.image(),
        publish: Faker.random.number()
      })
      .then(album => {
        for (var i = 0; i < 10; i++) {
          album.createSong({
            name: Faker.commerce.productName(),
            streams: Faker.random.number(),
            length: Faker.random.number(),
            popularity: Faker.random.number(),
            library: Faker.random.boolean()
          });
        }
      });
  });
});
