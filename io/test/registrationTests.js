/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';

//jshint expr: true

var Course = require("../Course")
  , Student = require("../Student")
  , Registration = require("../Registration")
  , DataLoader = require("../DataLoader")
  , chai = require("chai")
  , sinon = require("sinon")
  ;
  
chai.should(); 

describe("Registration", function () {
  var dataLoader
    , student
    , course
    , registration
    ;
    
  beforeEach(function() {
    dataLoader = sinon.stub(new DataLoader());
    course = Course.create(dataLoader);
    student = Student.create(dataLoader);
    
    dataLoader.saveCourseSync.returns(true);
    dataLoader.getStudentSync.returns({
      name: "Susan", id:1
    // this is to allow the stub to funciton properly so that it can have data if its called
    });
  });
  
  it("doesn't call save if the course is full", function() {
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 2,
      students: [{id:2}, {id:3}],
      id: 1
    });
    //This is where sinon stubs come in handy, we use them to tell the data loader what to load when someone calls it. We give the object paramters to return based off what we need for the test.

    registration.registerStudentForCourse(1, 1);
    
    sinon.assert.notCalled(dataLoader.saveCourseSync);
    // this is the assertion that save was not called, which is the function that is called if the course is not full
  });
  
  it("does call save if the course is not full", function() {
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 3,
      students: [{id:2}, {id:3}],
      id: 1
    });
    
    registration.registerStudentForCourse(1, 1);
    
    sinon.assert.called(dataLoader.saveCourseSync);
    //similarly to the previous assertion, this is to make sure the course is saved when the course is not full
  });

  //this is a good example of sinon mocking to be able to test code within a unit, this unit is not just a single class but it also has multipel objects assocaited with it. Because they are simple objects they can be assocaitged with the registration object.
  
});