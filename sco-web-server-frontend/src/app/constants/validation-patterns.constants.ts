export const VALIDATION_PATTERNS_CONSTANTS = {
    EMAIL: {
        PATTERN: new RegExp(/.+@.+\..+/),
        ERROR: 'label.validation.patterns.email',
    },
    PASSWORD: {
        PATTERN: new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
        ERROR: 'label.validation.patterns.password',
    },
}