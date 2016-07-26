var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var babelify = require("babelify");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
    pages: ['src/*.html']
};

gulp.task('libs', function() {
    return gulp.src([
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js'
        ], {base: 'node_modules/'})
        .pipe(sourcemaps.init())
        .pipe(concat('lib.min.js'))
        .pipe(uglify({}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

var watchedBrowserify = watchify(
    browserify({
        basedir: '.',
        debug: true,
        entries: [
            'src/main.ts'
        ],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform("babelify")
);


function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ["libs", "copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);