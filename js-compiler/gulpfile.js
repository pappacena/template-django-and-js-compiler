var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
const minify = require("gulp-babel-minify");
const browserify = require('gulp-browserify');

gulp.task("default", function () {
  return gulp.src("src/js/main.js")
    .pipe(browserify())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(minify({
      mangle: true,
      removeConsole: false,
      removeDebugger: false
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('watch',['default'], function () {
    gulp.watch('src/**/*.js' , ['default']);
});
