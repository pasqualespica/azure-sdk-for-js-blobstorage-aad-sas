const crypto = require('crypto');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const uuidv1 = require('uuid');
const ObjectsToCsv = require('objects-to-csv');

// CSV reader
let inputStream = fs.createReadStream('resources/pagopa-psp.csv', 'utf8');
const sharedSecret = 'my-super-secret-pwd1';
const myMessage = 'abc1234566778';
var csvData = [];

// 1. HMAC function
function myEncrypt(myString2Encrypt, sharedSecret) {
  const computedSignature = crypto
    .createHmac('sha256', sharedSecret)
    .update(myString2Encrypt)
    .digest('hex');

  return computedSignature;
}

let countPsp = 0;
// 2. HMAC function
inputStream
  .pipe(
    new CsvReadableStream({
      parseNumbers: true,
      parseBooleans: true,
      trim: true,
      skipHeader: true,
    })
  )
  .on('data', function (row) {
    const psp = JSON.stringify(row).split(';');
    console.log(`${++countPsp}) ${psp[0].substring(2)} :`);
    const codiceFiscale = psp[1];
    const codiceABI = psp[2];
    let secretPwd = psp[8];
    let containerName_ = psp[9];
    // Create a unique name for the container
    let my_uuidv1 = uuidv1.v4(); // Create a version 4 (random) UUID

    secretPwd = secretPwd ? secretPwd : my_uuidv1;

    const secretPartContainerName = myEncrypt(codiceFiscale, secretPwd);
    const containerName = containerName_
      ? containerName_
      : `cont${codiceABI}${secretPartContainerName}`;

    console.log(
      `\tsecret: ${my_uuidv1}\n\tcomputed container name: ${containerName} `
    );

    if (!psp[8]) {
      console.log('------1');
      csvData.push(`${row};${secretPwd};${containerName}`);
    } else {
      console.log('------2');
      csvData.push(`${row}`);
    }
  })
  .on('end', function (data) {
    fs.writeFileSync('resources/pagopa-psp-upd.csv', csvData.join('\n'));
    console.log('File written successfully\n');
  });

// console.log(
//   `Message: ${myMessage}\nwith: ${sharedSecret}\ncomputed signature: ${myEncrypt(
//     myMessage,
//     sharedSecret
//   )} `
// );
