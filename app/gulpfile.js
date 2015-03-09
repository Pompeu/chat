var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css');

gulp.task('css', function() {
  return gulp.src('../src/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('public/css'))
});

gulp.task('scripts', function() {
  return gulp.src('../src/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'))
    .pipe(connect.reload());;
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch',function() {
  gulp.watch('../src/*.*',['scripts','css']);
  gulp.watch('public/scripts/*.js',['scripts']);
  gulp.watch('public/css/*.css',['css']);
  gulp.watch('public/*.html',['html']);
})

gulp.task('connect',function() {
  connect.server({
    root:['../app'],
    port: 8000,
    livereload: true
  })
});

gulp.task('default',['scripts','html','watch', 'connect','css'])