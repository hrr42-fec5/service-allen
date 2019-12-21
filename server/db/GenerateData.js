const fs          = require('fs'),
      stringify   = require('csv-stringify'),
      path        = require('path'),
      faker       = require('faker'),
      images      = require('./images');

const CreateCSV = () => {
  for(var a = 0; a < 4; a++) {
    const writer = fs.createWriteStream(path.join(__dirname,`/seedData/csv-chunk-${a}.csv`));
    writer.write('id,images,name\n', 'utf8');
    for(var b = 0; b < 2500000; b++) {
      if(b < 1000000) {
        const numPhotos = Math.floor(Math.random() * (20 - 10)) + 10;
        let photos = [];
        for(i = 0; i < numPhotos; i++) {
          const photo = images[Math.floor(Math.random() * (1008 - 0)) + 0]
          photos.push(photo);
        }
        console.log(`[Seed] Generating Entry ([${a+1}/4] ${b+1}/2500000)`);
        writer.write(`${(a * 2500000) + (b+1)},"[${photos}]",${faker.lorem.word()}\n`);
      }else {
        writer.end();
      }
    }
  }
}

module.exports = CreateCSV();