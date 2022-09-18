const gulp = require('gulp');
// const objectFitImages = require('postcss-object-fit-images'); // IE対応する場合コメント解除
const $ = require('../plugins');
const conf = require('../conf').sass;
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', () => {
  return (
    gulp
      .src(conf.src)
      // .pipe($.sourcemaps.init()) // ソースマップを出力する場合、コメント解除
      .pipe(sass().on('error', sass.logError))
      .pipe(
        $.autoprefixer({
          cascade: false,
          // grid: 'autoplace', // IE対応する場合はコメント解除
        }),
      )
      // .pipe($.postcss([objectFitImages()])) // IE対応する場合コメント解除
      // .pipe($.sourcemaps.write()) // ソースマップを出力する場合、コメント解除
      .pipe(
        $.rename((path) => {
          path.dirname = path.dirname.replace('css', '.');
        }),
      )
      .pipe(gulp.dest(conf.dest))
  );
});
