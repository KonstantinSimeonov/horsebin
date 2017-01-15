'use strict';

const gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    babel = require('gulp-babel');

gulp.task('paste-themes', () => gulp
                                    .src('./src/public/bower_components/prism/themes/*.css')
                                    .pipe(minifyCss())
                                    .pipe(gulp.dest('../npaste-build/public/bower_components/prism/themes/')));

gulp.task('bundles', () => gulp
                            .src('./src/views/*.dust')
                            .pipe(useref({ searchPath: './src' }))
                            .pipe(gulpif('*.js', babel({ presets: ['es2015'] })))
                            .pipe(gulpif('*.js', uglify()))
                            .pipe(gulpif('*.js', gulp.dest('../npaste-build/')))
                            .pipe(gulpif('*.css', minifyCss()))
                            .pipe(gulpif('*.css', gulp.dest('../npaste-build/')))
                            .pipe(gulpif('*.dust', gulp.dest('../npaste-build/views'))));

gulp.task('default', ['paste-themes', 'bundles']);