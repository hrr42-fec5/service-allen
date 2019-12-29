const fs          = require('fs'),
      path        = require('path'),
      faker       = require('faker'),
      images      = require('./images'),
      prompts     = require('prompts');

const FileToAdder = {
  "data-1" : 0,
  "data-2" : 2500000,
  "data-3" : 5000000,
  "data-4" : 7500000
}

const CreateCSV = (fileName, final) => { // Default chunk is 1mil, default numChunks is 10
  chunkSize = 2500001;
  const Writer = fs.createWriteStream(path.join(__dirname,`/seedData/${fileName}.csv`));
  const Write = () => {
  let ok = true;
  do {
    const numPhotos = Math.floor(Math.random() * (15 - 7)) + 7;
    let photos = [];
    for(let i = 0; i < numPhotos; i++) {
      const photo = images[Math.floor(Math.random() * (1008 - 0)) + 0]
      photos.push(photo);
    }
    chunkSize--;
    let i = chunkSize + FileToAdder[fileName] + 1;

    if(chunkSize === 0) {
      Writer.write(`${i},"[${photos}]",${faker.lorem.word()}\n`, 'utf8');
      if(final) {
        let endTime = new Date().getTime();
        let msElapse = endTime-startTime;
        let timeElapse = new Date(msElapse).toISOString().slice(14, -1);
        console.log(`[DataGen] Data generation complete in ${timeElapse} (mm:ss:mss)`);
      }
    } else {
      ok = Writer.write(`${i},"[${photos}]",${faker.lorem.word()}\n`, 'utf8');
    }
  } while (chunkSize > 0 && ok);
  if(chunkSize > 0) {
    Writer.once('drain', Write);
  }
}

  Write();
}

let startTime;

(async () => {
  const response = await prompts({
    type:'text',
    name:'select',
    message:"Welcome to Micah's DataGen Script. \nOptions:\n   1. 'full' - Generates 10 million entries (data 1-4)\n   2. 'first' - Generates 5 million entries (data 1-2)\n   3. 'last' - Generates 5 million entries (data 3-4)\n"
  });
  if(response.select == 'full') {
    startTime = new Date().getTime();
    console.log("[DataGen] Beginning data generation");
    CreateCSV('data-1', false);
    CreateCSV('data-2', false);
    CreateCSV('data-3', false);
    CreateCSV('data-4', true);
  } else if (response.select == 'first') {
    startTime = new Date().getTime();
    console.log("[DataGen] Beginning data generation");
    CreateCSV('data-1', false);
    CreateCSV('data-2', true);
  } else if (response.select == 'last') {
    startTime = new Date().getTime();
    console.log("[DataGen] Beginning data generation");
    CreateCSV('data-3', false);
    CreateCSV('data-4', true);
  } else {
    console.log("Invalid Entry: Exiting");
  }
})();



// const CreateCSV = () => {
//   for(var a = 0; a < 4; a++) {
//     const writer = fs.createWriteStream(path.join(__dirname,`/seedData/csv-chunk-${a}.csv`));
//     writer.write('id,images,name\n', 'utf8');
//     for(var b = 0; b < 2500000; b++) {
//       if(b < 1000000) {
//         const numPhotos = Math.floor(Math.random() * (20 - 10)) + 10;
//         let photos = [];
//         for(i = 0; i < numPhotos; i++) {
//           const photo = images[Math.floor(Math.random() * (1008 - 0)) + 0]
//           photos.push(photo);
//         }
//         console.log(`[Seed] Generating Entry ([${a+1}/4] ${b+1}/2500000)`);
//         writer.write(`${(a * 2500000) + (b+1)},"[${photos}]",${faker.lorem.word()}\n`);
//       }else {
//         writer.end();
//       }
//     }
//   }
// }

module.exports = CreateCSV;