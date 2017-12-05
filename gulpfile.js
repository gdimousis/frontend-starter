var webpack = require('webpack-stream');
var gulp = require('gulp');
var sass = require('gulp-sass'); 
var browserSync = require('browser-sync').create();
var webpackConfig = require('./webpack-config'); 

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
});

gulp.task('html', function(){
    gulp.src('src/**/*.{html,php}')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('scripts', function(){
    gulp.src('src/assets/js/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('sass', function () {
 return gulp.src('src/assets/scss/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('dist/assets/css'))
   .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('watch', ['browserSync'],  function () {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/assets/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.{html,php}', ['html']);
});

gulp.task('default', [ 'html', 'sass', 'scripts' ]);