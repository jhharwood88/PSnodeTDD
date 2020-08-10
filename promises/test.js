/// <reference path="typings/mocha/mocha.d.ts"/>
'use strict';

var Promise = require("bluebird")
, chai = require("chai")
, chaiAsPromised = require('chai-as-promised')
, should = chai.should()
;

chai.use(chaiAsPromised);

var student = { name: "John Doe", id: 3 }

var dataAccess = {
  getStudent: function(id) {
    if(id === 3) {
      return Promise.resolve(student);
    } else {
      return Promise.reject('Invalid Student Id')
    }
  }
};

describe("getStudent", function () {
  it('uses the done function', function(done) {
    dataAccess.getStudent(3).then(function(student) {
      student.id.should.equal(3);
      done();

      // This test makes use of the done() function so that once the code has ran it can evaluate the results properly. This is to check that the promise of the student id of 3 is correct
    });
  });
  
  it('fulfills the promise', function() {
    return dataAccess.getStudent(3);
    // This is a simplified versin of the previous test, only evaluating the promise on whether or not it matches what is returned.
  });
  
  it('fulfills the promise with the correct student', function() {
    return dataAccess.getStudent(3).should.eventually.equal(student);
    //While this test is less common, this test is designed to make use of the chai as promised that the promise eventually returns the student value. eventually is a special syntax within chai for promises.
  });
});