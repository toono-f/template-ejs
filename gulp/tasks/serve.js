const gulp = require('gulp');
const browserSync = require('browser-sync');
const conf = require('../conf').serve;

gulp.task('serve-ejs', () => {
  browserSync.init({
    server: {
      baseDir: conf.dest.server.baseDir,
    },
  });
});

gulp.task('serve', () => {
  browserSync(conf.build);
});
