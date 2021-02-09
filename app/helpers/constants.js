// Regex
exports.EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
exports.WOLOX_DOMAIN_VALIDATION = /^.*?(wolox.)\w.*$/i;
exports.ALPHANUMERIC = /^[a-zA-Z0-9]*$/i;
exports.WOLOX_DOMAIN = 'wolox.';

// Messages
exports.missingMessage = 'This field is required';
exports.invalidContentMessage = 'The content of this field is invalid';
exports.invalidEmailMessage = 'This field must be a valid email';
exports.invalidEmailDomainMessage = `The email must include the ${this.WOLOX_DOMAIN} domain`;
exports.invalidPasswordLengthMessage = 'must be a minimum of 8 characters';
exports.invalidAlphanumericMessage = 'This field must be alphanumeric';

// Error Messsages
exports.uniqueErrorMessage = 'The resource you are trying to create already exists';
exports.validationErrorMessage = 'There has been a validation error';
exports.notFoundErrorMessage = 'The resource was not found';
exports.authenticationErrorMessage = 'Invalid credentials';

// Const
exports.SALT_ROUNDS = 10;
