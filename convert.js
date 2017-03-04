var csv = require("csv-parser");
var JSONStream = require("JSONStream");
var fs = require("fs");
var _ = require("lodash");

var columns = [
  "id",
  "name",
  "city",
  "country",
  "iata",
  "icao",
  "latitude",
  "longitude",
  "altitude",
  "timezone",
  "dst",
  "tz"
];

var readStream = fs.createReadStream("airports-extended.dat");
var writeStream = fs.createWriteStream("airports.json");

var parse = csv({
  headers: columns,
  raw: false
});

readStream
  .pipe(parse)
  .on("data", function(data) {
    data.latitude = parseFloat(data.latitude);
    data.longitude = parseFloat(data.longitude);
    data.altitude = parseInt(data.altitude);
  })
  .pipe(JSONStream.stringify())
  .pipe(writeStream);
