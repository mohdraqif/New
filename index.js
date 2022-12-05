"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var util_1 = require("./util");
var dotless_1 = require("dotless");
var exp = /\d+/g;
var parseStackLines = function (stacks, cl) {
    if (cl.startsWith(' 1')) {
        return stacks;
    }
    var length = cl.length;
    for (var ci = 1; ci < length; ci = ci + 4) {
        if (cl[ci] !== ' ') {
            var stackIndex = Math.floor(ci / 4);
            if (!stacks[stackIndex]) {
                stacks[stackIndex] = [];
            }
            stacks[stackIndex].push(cl[ci]);
        }
    }
    return stacks;
};
var parseInstruction = function (l) {
    return (0, dotless_1.matchesToArray)(l, exp, function (m) { return +m[0]; });
};
var removeCreates = function (stack, quantity) {
    return stack.splice(stack.length - quantity);
};
var getTop = function (stacks) {
    return stacks.reduce(function (acc, s) { return acc + s[s.length - 1]; }, '');
};
var solve = function (fn) {
    var _a, _b;
    var _c = (0, util_1.getLines)(fn, '\n\n'), stackLines = _c[0], insLines = _c[1];
    var stackP1 = stackLines
        .split('\n')
        .reduceRight(parseStackLines, []);
    var stackP2 = stackP1.map(function (s) { return __spreadArray([], s, true); }); // create a new copy
    var instructions = insLines.split('\n').map(parseInstruction);
    for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
        var _d = instructions_1[_i], quantity = _d[0], fromCI = _d[1], toCI = _d[2];
        var removedP1 = removeCreates(stackP1[fromCI - 1], quantity);
        var removedP2 = removeCreates(stackP2[fromCI - 1], quantity);
        (_a = stackP1[toCI - 1]).push.apply(_a, removedP1.reverse());
        (_b = stackP2[toCI - 1]).push.apply(_b, removedP2);
    }
    return [getTop(stackP1), getTop(stackP2)];
};
