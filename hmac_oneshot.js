const crypto = require('crypto');
const sharedSecret = 'my-super-secret-pwd1';
const myMessage = 'abc1234566778';

// 1. HMAC function
function myEncrypt(myString2Encrypt, sharedSecret) {
  const computedSignature = crypto
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
