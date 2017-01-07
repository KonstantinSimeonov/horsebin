'use strict';

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('minify-css', function () {
    return gulp.src('./src/public/css/custom.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename('custom.min.css'))
        .pipe(gulp.dest('./src/public/css/'));
});

var concat = require('gulp-concat');

gulp.task('minify-js', function () {
    return gulp.src('./src/public/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/public/js'))
});

gulp.task('default', ['minify-css'], () => console.log('done'));