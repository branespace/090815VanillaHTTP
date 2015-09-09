"use strict";

var gulp = require('gulp'),
    gulpMocha = require('gulp-mocha'),
    gulpJshint = require('gulp-jshint');

gulp.task('default', ['jshint', 'mocha']);

gulp.task('mocha', function () {
    return gulp.src('*/**.js')
        .pipe(gulpMocha());
});

gulp.task('jshint', function() {
    return gulp.src('*/**.js')
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter('default'));
});