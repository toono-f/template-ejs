const gulp = require('gulp');
const $ = require('../plugins');
const conf = require('../conf').ejs;
const fs = require('fs');

gulp.task('ejs', () => {
  const json = JSON.parse(fs.readFileSync(`${conf.json}`));
  return gulp
    .src(conf.src)
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('<%= error.message %>'),
      }),
    )
    .pipe(
      $.data(function (file) {
        return { filename: file.path };
      }),
    )
    .pipe($.ejs({ json: json }))
    .pipe(
      $.rename({
        extname: '.html',
      }),
    )
    .pipe($.replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
    .pipe(gulp.dest(conf.dest));
});
