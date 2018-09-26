const faker = require('faker');

for (var i = 1; i <= 10000; i++) {
  let objA = {
    id: i,
    name: faker.lorem.word(),
    albums: []
  };

  for (var j = 0; j < 3; j++) {
    let objB = {
      id: j,
      name: faker.lorem.words(),
      img: `https://s3-us-west-1.amazonaws.com/dotthen/`,
      publish: Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920, // published between 2018 and 1920
      songs: []
    };

    for (var k = 0; k < 10; k++) {
      let objC = {
        id: k,
        name: faker.lorem.words(),
        streams:
          Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000, // streams between 50mm and 250mm
        length: Math.floor(Math.random() * (300 - 210 + 1)) + 210, // length between 5 min and 3.5 min
        popularity: Math.floor(Math.random() * 20) + 1, // popularity scale between 1 and 20 - used to select most popular songs
        library: Math.random() >= 0.5 // whether song has been added to users library
      };

      objB.songs.push(objC);
    }

    objA.albums.push(objB);
  }

  // Artist.create(objA, function(err, data) {
  //   if (err) {
  //     console.log('error');
  //   } else {
  //     console.log('success');
  //   }
  // });

  console.log(objA);
}
