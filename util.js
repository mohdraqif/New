"use strict";
exports.__esModule = true;
exports.neighborAddressesALL = exports.gridBoundChecker = exports.mapGrid = exports.neighborAddressesST = exports.mapLineToNumber = exports.mapLine = exports.getLines = exports.getInput = void 0;
var fs_1 = require("fs");
function getInput(fileName) {
    return (0, fs_1.readFileSync)("../inputs/".concat(fileName, ".txt"), 'utf8').replace(/\r/g, '');
}
exports.getInput = getInput;
function getLines(fileName, separator) {
    if (separator === void 0) { separator = '\n'; }
    return getInput(fileName).split(separator);
}
exports.getLines = getLines;
function mapLine(fileName, selector, separator) {
    if (separator === void 0) { separator = '\n'; }
    return getInput(fileName).split(separator).map(selector);
}
exports.mapLine = mapLine;
function mapLineToNumber(fileName, separator) {
    if (separator === void 0) { separator = '\n'; }
    return getInput(fileName)
        .split(separator)
        .map(function (n) { return +n; });
}
exports.mapLineToNumber = mapLineToNumber;
var neighborAddressesST = function (r, c) { return [
    [r - 1, c],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c], // Bottom
]; };
exports.neighborAddressesST = neighborAddressesST;
function mapGrid(grid, neighborFinder, mapper) {
    var rowCount = grid.length;
    var columnCount = grid[0].length;
    var result = [];
    var withInBound = function (_a) {
        var nr = _a[0], nc = _a[1];
        return 0 <= nr && nr < rowCount && 0 <= nc && nc < columnCount;
    };
    for (var ri = 0; ri < rowCount; ri++) {
        for (var ci = 0; ci < columnCount; ci++) {
            result.push(mapper(grid[ri][ci], [ri, ci], neighborFinder(ri, ci)
                .filter(withInBound)
                .map(function (_a) {
                var nr = _a[0], nc = _a[1];
                return grid[nr][nc];
            })));
        }
    }
    return result;
}
exports.mapGrid = mapGrid;
var gridBoundChecker = function (grid) {
    var rc = grid.length;
    var cc = rc > 0 ? grid[0].length : 0;
    return function (_a) {
        var ar = _a[0], ac = _a[1];
        return 0 <= ar && ar < rc && 0 <= ac && ac <= cc;
    };
};
exports.gridBoundChecker = gridBoundChecker;
var neighborAddressesALL = function (r, c) { return [
    [r - 1, c - 1],
    [r - 1, c + 0],
    [r - 1, c + 1],
    [r + 0, c - 1],
    [r + 0, c + 1],
    [r + 1, c - 1],
    [r + 1, c + 0],
    [r + 1, c + 1], // Bottom Right
]; };
exports.neighborAddressesALL = neighborAddressesALL;
