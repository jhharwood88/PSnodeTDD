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
            },
            addclass: function(schedule) {
                if(!schedule.classIsFull()){
                    // code to be executed
                    return true;
                } else {
                    return false; 
                }
            }
        };

        schedule = {
            dropClass: function() {
                console.log('Class dropped');
            },
            classIsFull: function(){
                return true;
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
            sinon.spy(schedule, 'dropClass');
            student.dropClass(1, schedule);
            schedule.dropClass.called.should.be.true;
        });

    });

    //Stubs are a way to watch an entire object, because we most often work with objects its more common to use stubs than spies. 

    describe('student with stubs', function(){

        it('should call a stubbed method', function(){
            var stub = sinon.stub(schedule);
            //when calling a stub on an object, it replaces all the fucntions on that object with a stub function. When calling them, you would reference the stub itself rather than the object.
            student.dropClass(1, stub.dropClass);
            stub.dropClass.called.should.be.true;
            //stubs will not call the inner implentation of an underlying method, even though the scheudle.dropClass console logs it wont call the log. 
            //Because the stub is an object, it can be called the same as a regular object.
        });
        it('should return true whne the class is full', function(){
            var stub = sinon.stub(schedule);
            stub.classIsFull.returns(false);
            // this will allow the test to evaluate the stub, otherwise causing the test to continuously fail as the classIsFull method would always return true.
            var returnVal = student.addclass(stub);
            returnVal.should.be.true 

            //This shows the power of stubs, as you gain more control over them than you would with spies and because they control an entire object they are often much more convinient.
        });
    });

    describe('student with mocks', function(){
        it('mocks schedule', function(){
            // differs from spies or stubs as it allows you to setup the test before the code executes. This allows you to set expectations for the code, and will pass or fail based off those expectations.
            var mockObj = sinon.mock(schedule);
            var expectation = mockObj.expects('class is full').once();
            // this sets up the expectation that the class is full method will be called one time

            student.addClass(schedule);
            // this is the real scheulde object modified through sinon
            expectation.verify();
            // this is to verify the call to mocks is being executed as intended

            // mocks can be used, but often stubs will do what you need for testing

        })
    })
});