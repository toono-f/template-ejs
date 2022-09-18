const gulp = require('gulp');
// const $ = require('../plugins'); // 統合する場合はコメント解除
const conf = require('../conf').vendorScripts;

gulp.task('vendorScripts', () => {
  return (
    gulp
      .src(conf.src)
      // .pipe($.concat(conf.concat)) // 統合する場合はコメント解除
      .pipe(gulp.dest(conf.dest))
  );
});
