'use strict';

const createValidator = require('fluent-schemer'),
    { string, number, object } = createValidator().schemas;

const pasteContentSchema = string()
                            .required()
                            .minlength(4)
                            .maxlength(1024 * 500),

    createPasteSchema = object({
        content: pasteContentSchema,
        name: string()
                .pattern(/^([a-z]|\d|\s){2,20}$/i),
        lang: string()
                .minlength(1)
                .maxlength(20),
        pswd: string()
                .minlength(2)
                .maxlength(20)
    }),

    searchTermSchema = string()
                        .pattern(/^([a-z]|\d|\s){0,20}$/i)
                        .required(),

    userPasswordSchema = string()
                            .minlength(6)
                            .maxlength(20)
                            .required(),

    newUserSchema = object({
        password: userPasswordSchema,
        username: string()
                    .minlength(3)
                    .maxlength(20)
                    .pattern(/^[a-z]+([a-z]|\d|_)+$/i)
                    .required()
    })
    .required();

module.exports = {
    /**
     * @param {{ content: string, name: string, lang: string?, author: string? }} inputNewPaste
     */
    newPaste(inputNewPaste) {
        const { errors, errorsCount } = createPasteSchema.validate(inputNewPaste);

        return { errors, isValid: !errorsCount };
    },
    /**
     * @param {string} term
     */
    searchTerm(term) {
        const { errors, errorsCount } = searchTermSchema.validate(term);

        return { errors, isValid: !errorsCount };
    },
    /**
     * @param {string} content
     */
    pasteContent(content) {
        const { errors, errorsCount } = pasteContentSchema.validate(content);

        return { errors, isValid: !errorsCount };
    },
    /**
     * @param {{ username: string, password: string }} user
     */
    newUser(user) {
        const { errors, errorsCount } = newUserSchema.validate(user);

        return { errors, isValid: !errorsCount };
    },
    /**
     * @param {string} password
     */
    userPassword(password) {
        const { errors, errorsCount } = userPasswordSchema.validate(password);

        return { errors, isValid: !errorsCount };
    }
};