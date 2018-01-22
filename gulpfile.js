const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const connect = require('gulp-connect');

gulp.task('pug', function(){
  return gulp.src('templates/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'))
});

gulp.task('stylus', function () {
  return gulp.src('css/styles.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy', function() {
  return gulp.src([
      '_redirects',
      'images/**'
    ], {base: "."})
    .pipe(gulp.dest('build'));
});

gulp.task('dev_server', function () {
  connect.server({
    name: 'Dev server',
    root: ['build'],
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['templates/**'], ['pug']);
  gulp.watch(['css/**'], ['stylus']);
});

gulp.task('build', [ 'pug', 'stylus', 'copy' ]);
gulp.task('serve', [ 'build', 'dev_server', 'watch' ]);
gulp.task('default', [ 'build' ]);
