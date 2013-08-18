/**
 * hunk
 * http://shannonmoeller.github.io/hunk
 *
 * Copyright (c) 2013 Shannon Moeller
 * Licensed under the MIT license.
 */

'use strict';

var delimiter = '---';

var splitter = new RegExp('(?:^|\n)(' + delimiter + '[^\n]*)(?:\n|$)', 'g');

var Hunks = function (data) {
    if (typeof data !== 'string') {
        throw new TypeError('Expected data to be a string.');
    }

    this.data = data;

    this.hasNamedHunk = false;

    this.hunks = null;

    this.split()
        .trimLeading()
        .trimTrailing()
        .normalizeLeader()
        .generate();
};

var proto = Hunks.prototype;

proto.split = function (data) {
    this.hunks = this.data.split(splitter);

    return this;
};

proto.trimLeading = function () {
    var hunks = this.hunks;

    if (hunks.length < 2) {
        return this;
    }

    if (hunks[0] === '') {
        hunks.shift();
    }

    return this;
};

proto.trimTrailing = function () {
    var hunks = this.hunks;

    if (hunks.length < 2) {
        return this;
    }

    if (hunks.slice(-1)[0] === '') {
        hunks.pop();
    }

    if (hunks.slice(-1)[0] === delimiter) {
        hunks.pop();
    }

    return this;
};

proto.normalizeLeader = function () {
    var hunks = this.hunks;

    if (hunks.length === 0) {
        return this;
    }

    if (hunks[0].slice(0, 3) !== delimiter) {
        hunks.unshift(delimiter);
    }

    return this;
};

proto.generate = function () {
    var index = null;
    var key = null;
    var value = null;

    var hunks = this.hunks;
    var length = hunks.length;
    var i = 0;

    var array = [];
    var object = {};

    for (; i < length; i += 2) {
        index = (i / 2) || 0;
        key = hunks[i].slice(3).trim() || index;
        value = hunks[i + 1] || '';

        if (key !== index) {
            this.hasNamedHunk = true;
        }

        array[index] = value;
        object[key] = value;
    }

    if (array.length === 0) {
        array.push('');
    }

    this.array = array;
    this.object = object;

    return this;
};

module.exports = function hunk(data) {
    var hunks = new Hunks(data);

    if (hunks.hasNamedHunk) {
        return hunks.object;
    }

    return hunks.array;
};
