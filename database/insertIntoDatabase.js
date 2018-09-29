const fs = require('fs');
const async = require('async');
const csv = require('csv');
const db = require('./db');

var input = fs.createReadStream('./songs10.csv');
var parser = csv.parse({
  columns: true,
  relax: true,
  rtrim: true,
  delimiter: ', '
});

var inserter = async.cargo(function(tasks, inserterCallback) {
  db.Song.bulkCreate(tasks).then(function() {
    inserterCallback();
  });
}, 1000);

parser.on('readable', function() {
  while ((line = parser.read())) {
    inserter.push(line);
  }
});

parser.on('end', function(count) {
  inserter.drain = function() {
    // doneLoadingCallback();
  };
});

input.pipe(parser);
