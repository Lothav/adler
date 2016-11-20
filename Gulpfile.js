var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

gulp.task('concat_uglify', function(cb) {
    gulp.src([
        'js/phaser.js',
        'js/adler.js',
        'js/players.js',
        'js/multiPlayers.js',
        'js/devil/devil.js',
        'js/devil/create.js',
        'js/devil/preload.js',
        'js/devil/update.js'
    ]).pipe(concat('adler.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
    cb();
});

gulp.task('default', ['concat_uglify']);