const gulp = require('gulp');
const imageminWebp = require('imagemin-webp');
const $ = require('../plugins');
const conf = require('../conf').imageminWebp;

gulp.task('imageminWebpDest', () => {
  return gulp
    .src(conf.dest.src, conf.dest.opts)
    .pipe(
      $.imagemin([
        imageminWebp({
          quality: 80,
        }),
      ]),
    )
    .pipe($.rename({ extname: '.webp' }))
    .pipe(gulp.dest(conf.dest.dest));
});

gulp.task('imageminWebpBuild', () => {
  return gulp
    .src(conf.build.src)
    .pipe(
      $.imagemin([
        imageminWebp({
          quality: 80,
        }),
      ]),
    )
    .pipe(
      $.rename((path) => {
        path.dirname = path.dirname.replace('assets/images', '');
      }),
    )
    .pipe($.rename({ extname: '.webp' }))
    .pipe(gulp.dest(conf.build.dest));
});
