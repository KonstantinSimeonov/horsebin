'use strict';

const gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    babel = require('gulp-babel');

const BUILD_DIR = '../horsebin-build';

gulp.task('paste-themes', () => gulp
                                    .src('./src/public/bower_components/prism/themes/*.css')
                                    .pipe(minifyCss())
                                    .pipe(gulp.dest(`${BUILD_DIR}/public/bower_components/prism/themes/`)));

gulp.task('bundles', () => gulp
                            .src('./src/views/*.dust')
                            .pipe(useref({ searchPath: './src' }))
                            .pipe(gulpif('*.js', babel({ presets: ['es2015'] })))
                            .pipe(gulpif('*.js', uglify()))
                            .pipe(gulpif('*.js', gulp.dest(`${BUILD_DIR}/`)))
                            .pipe(gulpif('*.css', minifyCss()))
                            .pipe(gulpif('*.css', gulp.dest(`${BUILD_DIR}/`)))
                            .pipe(gulpif('*.dust', gulp.dest(`${BUILD_DIR}/views`))));

gulp.task('default', ['paste-themes', 'bundles']);