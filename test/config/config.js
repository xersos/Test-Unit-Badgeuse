const assert = require('chai').assert;
const config = require('../../src/server/config/config');
const tokenList = require('../../src/server/config/tokenList');

describe('-- config.js --', function () {
    describe('> makeId()', function () {
        it('should return a string with 5 characters', function () {
            console.log(config.makeId);
            assert.typeOf(config.makeId, 'string');
            assert.lengthOf(config.makeId, 5);
        });
        it('should use only lowercase, uppercase and numerical digit', function () {
            assert.match(config.makeId, /[a-z]?[A-Z]?[0-9]?/);
        });
        it('should return a random string', function () {
            assert.isFalse(config.makeId === "abcde");
        });
    });
});

describe('-- tokenList.js --', function () {
    describe('> checkToken()', function () {
        it('should return a boolean', function () {
            assert.typeOf(tokenList.checkToken('4648484865464'), 'boolean');
        });
    });
    describe('> addToken()', function () {
        it('should push the token into LIST', function () {
            tokenList.addToken('4648484865464');
            assert.isTrue(tokenList.checkToken('4648484865464'));
        });
    });
    describe('> delToken()', function () {
        it('should delete the token of LIST', function () {
            tokenList.delToken('4648484865464');
            assert.isFalse(tokenList.checkToken('4648484865464'));
        });
    });
});