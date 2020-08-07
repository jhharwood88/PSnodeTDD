'use strict';

// jshint expr: true

//When running your test suite, you can call each specific test with mocha, or just call mocha itself and it will run the tests located in your 'test' directory
//Mocha can also be configured to automatically run your test suite when saving a file to see if the changes you made broke a test/tests. This would be by adding -w flag after calling Mocha. 

var chai = require('chai'),
    expect = chair.expect

chai.should();

describe('number tests', function() {
// This allows us to group tests in ways that make sense, meaning tests are grouped together logically

// to skip a given test without deleteing, you can use .skip or xit to skip a single test or block of tests.
// you can also use .only to select a single test to run out of your suite, but do it with caution as it may create issues with missing tests

    function isEven(num){
        return num % 2 === 0;
        //this is an evaluation of wether or not the number, when divided by 2 has a remaineder

    }

    describe('IsEven', function(){
        it('should return true when number is even', function(){
            isEven(4).should.be.true;
            //this checks that the reutnr of the isEven fucntion is true
        });

        it('should return false when number is even', function(){
            isEven(5).should.be.false;
            //this checks that the reutnr of the isEven fucntion is false
        });
    });

    function add(num1, num2){
        return num1 + num2;
    }

    
    describe('add without setup/teardown', function(){
        var num;

        beforeEach(function(){
            var num = 5;
            // This resets the value of var to 5 before each test is run
        });

        it('shoud be ten when adding 5 to 5', function(){
            num = add(num,5);
            num.should.equal(10);
            // Evaluates the total of the value of num, and 5.
        });

        
        it('should be twelve when adding 7 to 5', function(){
            add(num, 7).should.equal(12);
            // Evaluates the total of the value of num and 7
            // The beforeEeach is important here as it resets the value 'num' before each test
        })
    });
});