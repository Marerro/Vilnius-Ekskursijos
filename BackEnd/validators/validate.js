const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.ValidateError = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors
                .array()
                .map((error) => error.msg)
                .join("; "); // Joining errors into a single string

            throw new AppError(errorMessages, 400); // Throwing error with formatted messages
        }

        next(); // If no errors, proceed to the next middleware
    } catch (error) {
        next(error); // Passing error to the error-handling middleware
    }
};