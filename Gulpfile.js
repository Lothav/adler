var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

gulp.task('concat_uglify', function(cb) {
    gulp.src([
        'js/phaser.js',
        'js/client.js',
        'js/create.js',
        'js/preload.js',
        'js/update.js',
        'js/globals.js'
    ]).pipe(concat('adler.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
    cb();
});

gulp.task('default', ['concat_uglify']);