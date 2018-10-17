const crypto = require('crypto');
const plusRe = /\+/g;
const foreslashRe = /\//g;
const equalRe = /=/g;
const objectid = /^[a-f\d]{24}$/i;

exports.generateToken = () => {
    return crypto.randomBytes(32)
        .toString('base64')
        .replace(plusRe, '-')
        .replace(foreslashRe, '_')
        .replace(equalRe, '');
}