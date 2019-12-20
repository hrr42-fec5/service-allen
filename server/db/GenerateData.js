const client      = require('./database'),
      fs          = require('fs'),
      stringify   = require('csv-stringify'),
      path        = require('path'),
      faker       = require('faker');

const CreateCSV = () => {
  for(var a = 0; a < 4; a++) {
    const writer = fs.createWriteStream(path.join(__dirname,`/seedData/csv-chunk-${a}.csv`));
    writer.write('id,images,name\n', 'utf8');
    for(var b = 0; b < 2500000; b++) {
      console.log(`[Seed] Generating Entry ([${a+1}/4] ${b+1}/2500000)`);
      writer.write(`${(a * 2500000) + (b+1)},[${faker.image.imageUrl()}],${faker.lorem.word()}\n`);
    }
    writer.end();
  }
}

module.exports = CreateCSV();