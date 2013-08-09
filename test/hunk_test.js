'use strict';

var fs = require('fs');
var hunk = require('..');

exports.hunk = {
    'falsy': function (test) {
        test.expect(6);

        test.throws(function () { hunk();          }, 'Should throw type error.');
        test.throws(function () { hunk(undefined); }, 'Should throw type error.');
        test.throws(function () { hunk(null);      }, 'Should throw type error.');
        test.throws(function () { hunk(0);         }, 'Should throw type error.');
        test.throws(function () { hunk(NaN);       }, 'Should throw type error.');
        test.throws(function () { hunk(false);     }, 'Should throw type error.');

        test.done();
    },

    'noDelimiter': function (test) {
        test.expect(2);

        test.deepEqual(hunk(''),    [''], 'Should return an array with an empty string.');
        test.deepEqual(hunk('---'), [''], 'Should return an array with an empty string.');

        test.done();
    },

    'array': function(test) {
        test.expect(7);

        test.deepEqual(hunk('foo'),           ['foo'], 'Should return an array with "foo".');
        test.deepEqual(hunk('---\nfoo'),      ['foo'], 'Should return an array with "foo".');
        test.deepEqual(hunk('---\nfoo\n---'), ['foo'], 'Should return an array with "foo".');

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/array.hnk', 'utf8')),
            ['foo', 'bar', 'baz\n'],
            'Should split hunks into an array.'
        );

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/arrayLeading.hnk', 'utf8')),
            ['foo', 'bar', 'baz\n'],
            'Should disregard leading delimiter.'
        );

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/arrayTrailing.hnk', 'utf8')),
            ['foo', 'bar', 'baz'],
            'Should disregard trailing delimiter.'
        );

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/arrayWrapped.hnk', 'utf8')),
            ['foo', 'bar', 'baz'],
            'Should disregard leading and trailing delimiters.'
        );

        test.done();
    },

    'object': function(test) {
        test.expect(5);

        test.deepEqual(
            hunk('---foo\nbar'),
            { foo: 'bar' },
            'Should return an object with a key of "foo" and value of "bar".'
        );

        test.deepEqual(
            hunk('---foo\nbar\n---'),
            { foo: 'bar' },
            'Should return an object with a key of "foo" and value of "bar".'
        );

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/object.hnk', 'utf8')),
            { key1: 'value1', key2: 'value2', key3: 'value3\n' },
            'Should return an object with named keys.'
        );

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/objectTrailing.hnk', 'utf8')),
            { key1: 'value1', key2: 'value2', key3: 'value3' },
            'Should return an object, ignoring a trailing delimiter.'
        );

        test.deepEqual(
            hunk(fs.readFileSync(__dirname + '/fixtures/objectMixed.hnk', 'utf8')),
            { 0: 'value1', key2: 'value2', 2: 'value3' },
            'Should return an object with mixed numeric and named keys.'
        );

        test.done();
    }
};
