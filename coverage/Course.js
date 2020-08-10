'use strict';

//test coverage is used to help impove documentation on code by showing which code has been tested. This allows you to find gaps within your test coverage and to fill those in. The way we find out what coverage is there, we make use of the coverage tool 'Istanbul'. This will give us a percentage of code that has been covered by the testing. It will also create a coverage report, viewable as a html file that can be opened in the browser. From this we can see the breakdown of specific files, as well as coverage of specific functions.

function Course () {}

Course.create = function (name, code, description) {
  var course = new Course();
  
  course.name = name;
  course.code = code;
  course.description = description;
  
  course.students = [];
  course.times = [];
  
  return course;
};

var _p = Course.prototype;

_p.registerStudent = function (student) {
  this.students.push(student);
};

_p.unregisterStudent = function (studentId) {
  var me = this
  ;
  
  if (!this.students.some(function (student, i) {
    if (student.id === studentId) {
      me.students.splice(i, 1);
      return true;
    }
  })) {
    throw new Error("Student '"+studentId+"' is not registered for this course");
  }
};

_p.addTimes = function (days, times) {
  var me = this
  ;
  
  if (!Array.isArray(days)) {
    days = [days];
  }
  
  if (!Array.isArray(times)) {
    times = [times];
  }
  
    var validDays = [
    "Monday"
  , "Tuesday"
  , "Wednesday"
  , "Thursday"
  , "Friday"
  , "Saturday"
  , "Sunday"
  ];
  
  days.forEach(function (day) {
    if (validDays.indexOf(day) === -1) {
      throw new Error(day+" is not a valid day");
    }
    times.forEach(function (time) {
      me.times.push({
        "day": day
      , "time": time
      });
    });
  });
};

_p.showSchedule = function () {
  var scheduleString = ""
  , first = true;
  
  this.times.forEach(function (time) {
    if (!first) {
      scheduleString += "\n";
    }
    first = false;
    
    scheduleString += time.day + " at " + time.time;
  });
  
  return scheduleString;
};

_p.showStudents = function () {
  var studentString = ""
  , first = true;
  
  this.students.forEach(function (student) {
    if (!first) {
      studentString += "\n";
    }
    first = false;
    
    studentString += student.toString();
  });
  
  return studentString;
};

module.exports = Course;