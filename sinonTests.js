'use strict';
// jshint expr:true

var chai = require('chai'),
    sinion = require('sinon'),
    expect = chai.expect;
chai.should();

describe('sinon tests', function(){
    var students, schedule;

    beforeEach(function(){
        student = {
            dropClass: function(classId, cb) {

                // code to be executed

                // callback can be called on a object with a callback function

                if(!!cb.dropClass) {
                    //checks to see if the dropClass function exists, if so call it.
                    cb.dropClass();
                } else {
                    //otherwise just call the cb
                    cb();
                }
                cb();
            }
        };

        schedule = {
            dropClass: function() {
                console.log('Class dropped');
            }
        };
    });

    describe('student.dropClass', function(){
        it('should call the callback', function(){
            var spy = sinon.spy();
            // spy is a function that sinon will watch, able to tell if its been called, how many times it was called, and what params it was called with each time

            student.dropClass(1, spy);
            spy.called.should.be.true
            // this means that if there are changes made the test wont have to be modifed to accomidate.

        });

        it('should call the callback and log to console', function(){
            function onClassDropped(){
                console.log("onClassDropped was called");
            }

            var spy = sinon.spy(onClassDropped);

            student.dropClass(1, spy);
            spy.called.should.be.true;
            // This will wrap the onClassDropped function, calling the fucntion when the spy is invoked.
        });

        it('should call the callback even if its a method of an object', function(){
            // Cant simply wrap it and pass in the function, it will create a spy wrapped around the dropclass fucntion but it will be a lone function on the invoked object. Will not replace the function with a spy. Can not read 'property'. To solve this, replace the method with spy, first pass in object the method is on and second is the name of the method as a stirng. This will repalce the wrapped method with a spy.
            sinion.spy(schedule, 'dropClass');
            student.dropClass(1, schedule);
            schedule.dropClass.called.should.be.true;
        });

    });
});