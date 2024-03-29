'use strict';

var browserify = require('browserify');
var reactify = require('reactify');
var config = require('../config');
var partialify = require('partialify');
var gulp = require('gulp');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var source = require('vinyl-source-stream');

var libs = [
  'jquery',
  'lodash',
  'backbone'
];

// Vendor
gulp.task('vendor', function() {
  return browserify()
    .require('jquery')
    .require('lodash', {expose: 'underscore'})
    .require('backbone')
    .bundle({debug: true})
    .pipe(source('vendor.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

// Browserify
gulp.task('browserify', function() {
  return browserify('./app/scripts/main.js')
    .external(libs)
    .transform(partialify) // Transform to allow requireing of templates
    .transform(reactify)
    .bundle({debug: true})
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

// Script Dist
gulp.task('scriptDist', function() {
  return gulp.src(['dist/scripts/*.js'], {base: 'dist'})
    .pipe(gulp.dest('dist'))
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(rename('script-manifest.json'))
    .pipe(gulp.dest('dist'));
});
