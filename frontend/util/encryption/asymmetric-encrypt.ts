export async function importBase64PublicKey(base64Key: string) {
  // Convert Base64 string to ArrayBuffer
  const binaryDer = Uint8Array.from(atob(base64Key), (char) =>
    char.charCodeAt(0)
  );

  // Import the public key
  return await crypto.subtle.importKey(
    "spki", // Public key format for RSA
    binaryDer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true, // Key extractable
    ["encrypt"] // Usages
  );
}

export async function encryptData(publicKey: any, transactionHex: string) {
  // Convert the hex string of the Ethereum transaction to a Uint8Array
  const encodedTransaction = hexToUint8Array(transactionHex);

  // Encrypt the transaction data using RSA-OAEP and the public key
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP", // Use RSA-OAEP encryption
    },
    publicKey, // The public key used for encryption
    encodedTransaction // The data (Ethereum transaction) to encrypt
  );

  // Convert the encrypted data to Base64 (optional for easier transmission)
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(encryptedData))
  );

  return { encryptedData, base64String };
}

export function hexToUint8Array(hex: string) {
  if (hex.startsWith("0x")) {
    hex = hex.slice(2); // Remove the '0x' prefix if it exists
  }

  const length = hex.length / 2;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = parseInt(hex.substr(i * 2, 2), 16);
  }

  return uint8Array;
}
