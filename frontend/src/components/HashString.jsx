import CryptoJS from "crypto-js";

const secret_key = process.env.REACT_APP_CRYPTO_SECRET_KEY;

export function Encrypt(text) {
    const encryptedText = CryptoJS.AES.encrypt(text, secret_key).toString();
    return base64UrlEncode(encryptedText);
}

export function Decrypt(text) {
    const decryptedText = base64UrlDecode(text);
    return CryptoJS.AES.decrypt(decryptedText, secret_key).toString(CryptoJS.enc.Utf8);
}

// Base64 URL-safe 인코딩
function base64UrlEncode(base64String) {
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Base64 URL-safe 디코딩
function base64UrlDecode(base64UrlString) {
    let base64String = base64UrlString.replace(/-/g, '+').replace(/_/g, '/');
    while (base64String.length % 4) {
        base64String += '=';
    }
    return base64String;
}