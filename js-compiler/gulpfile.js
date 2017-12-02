var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var less = require('gulp-less')
var browserSync = require('browser-sync').create()
var cleanCSS = require('gulp-clean-css')
const minify = require('gulp-babel-minify')
const browserify = require('gulp-browserify')

/* JS MAIN SOURCE CODE */
gulp.task('dev-compile-main', function () {
  return gulp.src('src/js/main.js')
    .pipe(browserify())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dev-dist/js'))
})

gulp.task('compile-main', function () {
  return gulp.src('src/js/main.js')
    .pipe(browserify())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(minify({
      mangle: true,
      removeConsole: true,
      removeDebugger: true
    }))
    .pipe(gulp.dest('dist/js'))
})

/* JS WORKERS SOURCE CODE */
gulp.task('dev-compile-workers', function () {
  return gulp.src('src/js/worker_*.js')
    .pipe(browserify())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dev-dist/js'))
})

gulp.task('compile-workers', function () {
  return gulp.src('src/js/worker_*.js')
    .pipe(browserify())
    .pipe(babel())
    .pipe(minify({
      mangle: true,
      removeConsole: true,
      removeDebugger: true
    }))
    .pipe(gulp.dest('dist/js'))
})

/* LESS / CSS COMPILATION */
gulp.task('dev-less', function () {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('dev-dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('less', function () {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('copy-images', function () {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
    .pipe(gulp.dest('dev-dist/img'))
})

/* Joiners and watch */
// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {baseDir: ''}
  })
})

gulp.task('default', ['dev-compile-main', 'dev-compile-workers', 'dev-less', 'copy-images'])

gulp.task('build', ['compile-main', 'compile-workers', 'less', 'copy-images'])

gulp.task('watch', ['dev-compile-main', 'dev-compile-workers', 'dev-less', 'copy-images'], function () {
  gulp.watch('src/**/*.js', ['dev-compile-main', 'dev-compile-workers'])
  gulp.watch('src/**/*.less', ['dev-less'])
  gulp.watch('src/img/**/*', ['copy-images'])

  gulp.watch('dev-dist/**/*', browserSync.reload)
})
