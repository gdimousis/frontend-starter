var webpack = require('webpack-stream');
var gulp = require('gulp');
var sass = require('gulp-sass'); 
var browserSync = require('browser-sync').create();
var webpackConfig = require('./build_settings/webpack-config'); 

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
});

gulp.task('images', function(){
  gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'))
  .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('fonts', function(){
  gulp.src('src/assets/fonts/**/*')
  .pipe(gulp.dest('dist/assets/fonts'))
  .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('svg', function(){
  gulp.src('src/assets/svg/**/*')
  .pipe(gulp.dest('dist/assets/svg'))
  .pipe(browserSync.reload({
      stream: true
    }));
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

gulp.task('watch', ['html', 'sass', 'svg', 'fonts', 'images', 'scripts', 'browserSync' ],  function () {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/assets/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.{html,php}', ['html']);
  gulp.watch('src/assets/fonts/**/*', ['fonts']);
  gulp.watch('src/assets/svg/**/*', ['svg']);
  gulp.watch('src/assets/img/**/*', ['images']);
});

gulp.task('default', [ 'html', 'sass', 'svg', 'fonts', 'scripts', 'images' ]);