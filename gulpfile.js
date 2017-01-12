'use strict';

const gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    babel = require('gulp-babel');

gulp.task('default', () => gulp
                            .src('./src/views/*.dust')
                            .pipe(useref({ searchPath: './src' }))
                            .pipe(gulpif('*.js', babel({ presets: ['es2015'] })))
                            .pipe(gulpif('*.js', uglify()))
                            .pipe(gulpif('*.js', gulp.dest('../npaste-build/')))
                            .pipe(gulpif('*.css', minifyCss()))
                            .pipe(gulpif('*.css', gulp.dest('../npaste-build/')))
                            .pipe(gulpif('*.dust', gulp.dest('../npaste-build/views'))));