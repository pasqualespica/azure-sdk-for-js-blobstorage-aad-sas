crypto = require('crypto');

let sharedSecret = 'my-super-secret-pwd1';
let myMessage = 'psp#identifcativo-nome-del-psp#idnumero';

function myEncrypt(myString2Encrypt, sharedSecret) {
  let retrievedSignature, computedSignature;

  computedSignature = crypto
    .createHmac('sha256', sharedSecret)
    .update(myString2Encrypt)
    .digest('hex');

  return computedSignature;
}

console.log(
  `Message: ${myMessage}\nwith: ${sharedSecret}\ncomputed signature: ${myEncrypt(
    myMessage,
    sharedSecret
  )} `
);
