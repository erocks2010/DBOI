var helper = require('../helper');
var assert = require('assert');

var sampleObject = {};

describe('Object to Array Validator', function () {

    it('given an object convert to array', function () {
            var sampleObject={
                fname:'Tarun',
                lname:'Mathur',
                city:'Pune'
            }
            assert.deepEqual(helper.objectToArray(sampleObject), ['Tarun', 'Mathur', 'Pune']);
        });

        it('given an Array should return the original array',function(){
            var sampleArray=['Tarun', 'Mathur', 'Pune'];
            assert.deepEqual(helper.objectToArray(sampleArray),['Tarun', 'Mathur', 'Pune'])
        });
});

describe('Sorting ')