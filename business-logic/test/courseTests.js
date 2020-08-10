/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';

var Student = require("../Student")
, Course = require("../Course")
, chai = require("chai")
, should = chai.should()
, expect = chai.expect
;

describe("Course", function () {
    var courseName = "Introduction to Awesomeness",
        courseCode = "AWE 101",
        courseDescription = "This course will make you awesome!";
        student;
    
    beforeEach(function(){
        student = Student.create("John Doe", 5);
    });

        it('should save data correctly', function(){
            var course = Course.create(courseName, courseCode, courseDescription);

            should.exist(course.name);
            should.exist(course.code);
            should.exist(course.description);

            should.exist(course.students);
            course.students.should.eql([]);
            // this is differnet that equal, as equal would check by reference, where EQL deeply evaluates the array and should allow for the test to pass.
        });
  describe('registerStudents', function(){
      it('should add students to the students array', function(){
          var course = Course.create(courseName, courseCode, courseDescription);
          
          course.registerStudent(student);

          course.students.length.should.equal(1);
          course.students[0].id.should.equal(student.id);
          // These tests will check that the student is being added to the students array and that the ID matches that of the student created in the before each
      });
  });

  describe('unregisterStudents', function(){
    it('should throw and error if we try to remove student not in class', function(){
        var course = Course.create(courseName, courseCode, courseDescription);

        expect(function(){
            course.unregisterStudent("asda");
        }).to.throw();
        // We will pass this test a callback becuase if we pass it to the expect fucntion that its expected to throw an exception it will then be able to fail the test if an excpetion isnt thrown.
    });
  });

  describe('addTimes', function() {
    it('should add the given days/times to the course', function() {
      var course = Course.create(courseName, courseCode, courseDescription);
      var days = ["Monday", "Wednesday", "Friday"],
        times = ["10:00", "14:00"];
        
      course.addTimes(days, times);
      
      course.times.length.should.equal(6);
      course.times[2].should.eql({
        day: "Wednesday", time: "10:00"
      });
    });
    
    it('should not add a non-day to the times array', function() {
      var course = Course.create(courseName, courseCode, courseDescription);
      var day = "fabulousday", time = "10:00";
      
      expect(function() {
        course.addTimes(day, time);
      }).to.throw();
      // This is an example of how to test edge cases where there is a list of given days and even if a day is submitted in the correct format if it doesnt meet a strict list of criteria, in this case a list of days, then it causes the test to fail.
    });
  });
});
