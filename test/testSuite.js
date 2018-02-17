var helper = require('../helper');
var assert = require('assert');

var sampleObject = {};

describe('Object to Array Validator', function () {

    it('given an object convert to array', function () {
        var sampleObject = {
            fname: 'Tarun',
            lname: 'Mathur',
            city: 'Pune'
        }
        assert.deepEqual(helper.objectToArray(sampleObject), ['Tarun', 'Mathur', 'Pune']);
    });

    it('given an Array should return the original array', function () {
        var sampleArray = ['Tarun', 'Mathur', 'Pune'];
        assert.deepEqual(helper.objectToArray(sampleArray), ['Tarun', 'Mathur', 'Pune'])
    });
});

describe('Sort Table', function () {
    var currenciesInOrder = [
        ['A', 1, 2, 3, 3, 0.5, 0.3, [1.5]],
        ['B', 1, 2, 3, 3, 0.5, 0.6, [1.5]],
        ['C', 1, 2, 3, 3, 0.5, 0.1, [1.5]],
        ['D', 1, 2, 3, 3, 0.5, 0.2, [1.5]]
    ];
    it('Sorting original data', function () {
        var expected = [
            ['C', 1, 2, 3, 3, 0.5, 0.1, [1.5, 1.5]],
            ['D', 1, 2, 3, 3, 0.5, 0.2, [1.5, 1.5]],
            ['A', 1, 2, 3, 3, 0.5, 0.3, [1.5, 1.5]],
            ['B', 1, 2, 3, 3, 0.5, 0.6, [1.5, 1.5]]
        ];
        assert.deepEqual(helper.sortTable(currenciesInOrder), expected);
    });
    it('Sorting with updated data 1', function () {
        var updateCurrency = {
            "name": "C", "bestBid": 2, "bestAsk": 1, "openBid": 3, "openAsk": 4, "lastChangeAsk": 0.4, "lastChangeBid": 0.7
        }
        var expected = [
            ['D', 1, 2, 3, 3, 0.5, 0.2, [1.5, 1.5, 1.5]],
            ['A', 1, 2, 3, 3, 0.5, 0.3, [1.5, 1.5, 1.5]],
            ['B', 1, 2, 3, 3, 0.5, 0.6, [1.5, 1.5, 1.5]],
            ['C', 2, 1, 3, 4, 0.4, 0.7, [1.5, 1.5, 1.5]]
        ];
        assert.deepEqual(helper.sortTable(currenciesInOrder, updateCurrency), expected);
    })
    it('Sorting with updated data 2', function () {
        var updateCurrency = {
            "name": "A", "bestBid": 4, "bestAsk": 1, "openBid": 1, "openAsk": 4, "lastChangeAsk": 0.1, "lastChangeBid": 0.9
        }
        var expected = [
            ['D', 1, 2, 3, 3, 0.5, 0.2, [1.5, 1.5, 1.5, 1.5]],
            ['B', 1, 2, 3, 3, 0.5, 0.6, [1.5, 1.5, 1.5, 1.5]],
            ['C', 2, 1, 3, 4, 0.4, 0.7, [1.5, 1.5, 1.5, 1.5]],
            ['A', 4, 1, 1, 4, 0.1, 0.9, [1.5, 1.5, 1.5, 2.5]],
        ];
        assert.deepEqual(helper.sortTable(currenciesInOrder, updateCurrency), expected);
    })
    it('Sorting with updated data 3', function () {
        var updateCurrency = {
            "name": "B", "bestBid": 2, "bestAsk": 7, "openBid": 1, "openAsk": 4, "lastChangeAsk": 0.3, "lastChangeBid": 0.1
        }
        var expected = [
            ['B', 2, 7, 1, 4, 0.3, 0.1, [1.5, 1.5, 1.5, 1.5, 4.5]],
            ['D', 1, 2, 3, 3, 0.5, 0.2, [1.5, 1.5, 1.5, 1.5, 1.5]],
            ['C', 2, 1, 3, 4, 0.4, 0.7, [1.5, 1.5, 1.5, 1.5, 1.5]],
            ['A', 4, 1, 1, 4, 0.1, 0.9, [1.5, 1.5, 1.5, 2.5, 2.5]],
        ];
        assert.deepEqual(helper.sortTable(currenciesInOrder, updateCurrency), expected);
    });
});

function a(i) {
    describe('Adding SparkLine data', function () {
        var currenciesInOrder = [['A', 4, 1, 1, 4, 0.1, 0.9]];
        var expected = [['A', 4, 1, 1, 4, 0.1, 0.9, [2.5]]];
        it('Test ' + i, function () {
            assert.deepEqual(helper.addSparklineDataToSortedTable(currenciesInOrder), expected);
            expected[0][7].push(2.5);
        })
    })
}
for (let i = 0; i < 29; i++) {
    a(i)
}