import { publicEncrypt, privateDecrypt, constants } from 'crypto';

const encryptData = (message: string, publicKey: string) =>
  publicEncrypt(publicKey, Buffer.from(message));

const decryptData = (privateKey: string, encryptedBase64: string) => {
  const encryptedDataBuffer = Buffer.from(encryptedBase64, 'base64');
  const decryptedBuffer = privateDecrypt(
    {
      key: privateKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING, // Using RSA-OAEP padding
      oaepHash: 'sha256', // Hash algorithm used in OAEP
    },
    encryptedDataBuffer,
  );

  // Step 3: Convert the decrypted buffer back to a string (assuming UTF-8 encoding)
  const decryptedData = decryptedBuffer.toString('hex');
  return decryptedData;
};

export default {
  encryptData,
  decryptData,
};
