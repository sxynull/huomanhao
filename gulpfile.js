var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var replace = require('gulp-replace');
var px2rem = require('gulp-px2rem-plugin');
uglify = require('gulp-uglify'),


         del = require('del');



var paths = {
  sass: ['./scss/**/*.scss']
};
gulp.task('pxToRem', function() {
    gulp.src('./www/css/*.css')
        .pipe(px2rem())
      .pipe(gulp.dest('./www/css/'))
});

gulp.task('minifyjs', function() {

     gulp.src('./m/m_v2.0/js/app.js')


       .pipe(uglify({
                 mangle:false,//类型：Boolean 默认：true 是否修改变量名
                 compress:true//类型：Boolean 默认：true 是否完全压缩

             }))

        .pipe(gulp.dest('./m/m_v2.0/js'))    //输出main.js到文件夹

        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名





 });




gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
