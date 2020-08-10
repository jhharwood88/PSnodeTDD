'use strict'

// gulp is a task runner that can be used to automate any type of task, often used as a build system for web projects

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util');

gulp.task('mocha', function(){
    return gulp.src(['*.js'], {read:false})
    .pipe(mocha({reporter: 'list'}))
    .on('error', gutil.log);

    // loads up the js files, this will be piped into the mocha module where it will be formatted by the reporter. If there are errors it will log those.
});

// this will watch the files and rerun the tests whenever they change
gulp.task('wathc mocha', function(){
    gulp.run('mocha');
    // this has the tests to run once, so that it can then watch to re run the tests if there are changes.
    gulp.watch(['*.js'],['mocha']);
    // this will watch the files within the file patterns provided, the second array is the task that are required to run
});

//this is to set a default task, if any time gulp is called without a second peram this is the task to be run
gulp.task('default', ['watch-mocha']);