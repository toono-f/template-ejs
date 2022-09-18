const gulp = require('gulp');
const $ = require('../plugins');
const conf = require('../conf').cleanCss;
const mqpacker = require('css-mqpacker');

gulp.task('cleanCss', () => {
  return (
    gulp
      .src(conf.src)
      .pipe(
        $.cleanCss({
          compatibility: {
            properties: {
              zeroUnits: false, // 0の場合も単位を消さない（min,max関数だと消すと動かないため）
            },
          },
        }),
      )
      // .pipe($.rename({ suffix: '.min' })) // build対象がmain.min.cssのみの場合
      .pipe(
        // build対象がmain.min.css以外のCSSも存在する場合
        $.rename((path) => {
          if (path.basename.endsWith('main')) {
            path.basename += '.min';
          }
        }),
      )
      // .pipe(
      //   $.purgecss({
      //     content: ['build/**/*.html'],
      //     safelist: ['is-active', 'is-open', 'is-passive', 'is-current', 'is-zoom', 'is-ie', 'is-safari', 'is-show'],
      //     whitelistPatterns: [],
      //     whitelistPatternsChildren: [],
      //     // rejected: true, // 削除したクラスを確認する場合コメント解除
      //   }),
      // )
      .pipe($.postcss([mqpacker()]))
      .pipe(gulp.dest(conf.dest))
  );
});
