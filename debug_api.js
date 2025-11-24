const https = require('https');

const options = {
  method: 'GET',
  hostname: 'vehicle-database.p.rapidapi.com',
  port: null,
  path: '/evehicleapi/get-data?make=Tesla',
  headers: {
    'x-rapidapi-key': '6704570a14mshfcc1ed9f1def59ep183c04jsn610b8aecb02e',
    'x-rapidapi-host': 'vehicle-database.p.rapidapi.com'
  }
};

const req = https.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.on('error', function (e) {
  console.error(e);
});

req.end();
