// Regex
exports.EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
exports.WOLOX_DOMAIN = 'wolox.co';
exports.ALPHANUMERIC = /^[a-zA-Z0-9]*$/gim;

// Messages
exports.MISSING = 'This field is required';
exports.INVALID_CONTENT = 'The content of this field is invalid';
exports.INVALID_EMAIL = 'This field must be a valid email';
exports.INVALID_EMAIN_DOMAIN = `The email must include the ${this.WOLOX_DOMAIN} domain`;
exports.INVALID_PASSWORD_LENGTH = 'must be a minimum of 8 characters';
exports.INVALID_ALPHANUMERIC = 'This field must be alphanumeric';

exports.SALT_ROUNDS = 10;
