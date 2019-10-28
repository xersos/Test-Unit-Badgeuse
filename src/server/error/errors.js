'use strict';
const HttpStatus = require('http-status-codes');

class ExtendableError extends Error {
    constructor(message) {
        if (new.target === ExtendableError)
            throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.contructor);
    }
}

// 400 Bad Request
class BadRequest extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('bad request');
        else
            super(m);
    }
}

// 401 Unauthorized
class Unauthorized extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('unauthorized');
        else
            super(m);
    }
}

// 403 Forbidden
class Forbidden extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('forbidden');
        else
            super(m);
    }
}

// 404 Not Found
class NotFound extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('not found');
        else
            super(m);
    }
}

// 409 Conflict
class Conflict extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('conflict');
        else
            super(m);
    }
}

// 422 Unprocessable Entity
class UnprocessableEntity extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('unprocessable entity');
        else
            super(m);
    }
}

// 500 Internal Server Error
class InternalServerError extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0)
            super('internal server error');
        else
            super(m);
    }
}


/**
 *  Returns json response from a given error using NotFound, BadRequest or Forbidden
 * @param err - the passed error from the db function
 * @param res - the response object passed
 * @returns {*}
 */
function dbError(err, res) {
    switch (err.Name) {
        case NotFound:
            return res.status(HttpStatus.NOT_FOUND).send({status: 404, message: err.message}); // 404
        case BadRequest:
            return res.status(HttpStatus.BAD_REQUEST).send({status: 400, message: err.message}); // 400
        case Forbidden:
        default:
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({status: 500, message: err.message}); // 500
    }
}

module.exports.dbError = dbError;
module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;
