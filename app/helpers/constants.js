// Regex
exports.EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
exports.WOLOX_DOMAIN = 'wolox.com.ar';
exports.ALPHANUMERIC = [/[0-9]/, /[a-zA-Z]/];

// Messages
exports.MISSING = 'This field is required';
exports.INVALID_CONTENT = 'The content of this field is invalid';

exports.SALT_ROUNDS = 10;
