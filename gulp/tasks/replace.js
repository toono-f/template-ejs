const gulp = require('gulp');
const $ = require('../plugins');
const conf = require('../conf').replace;

//- キャッシュ対策
const d = new Date();
const DateTimeFormat = 'YYYYMMDDhhmiss';
let toFileName = DateTimeFormat.replace(/YYYY/g, String(d.getFullYear()))
  .replace(/MM/g, ('0' + (d.getMonth() + 1)).slice(-2))
  .replace(/DD/g, ('0' + d.getDate()).slice(-2))
  .replace(/hh/g, ('0' + d.getHours()).slice(-2))
  .replace(/mi/g, ('0' + d.getMinutes()).slice(-2))
  .replace(/ss/g, ('0' + d.getSeconds()).slice(-2));

gulp.task('replaceHtml', () => {
  const regJs = new RegExp('main.js');
  const regCss = new RegExp('main.css', 'g');
  return (
    gulp
      .src(conf.html.src)
      .pipe($.htmlhint('.htmlhintrc'))
      // .pipe(
      //   $.htmlmin({
      //     collapseWhitespace: true, // 余白を除去する
      //     removeComments: true, // HTMLコメントを除去する
      //   }),
      // )
      .pipe($.replace(regJs, `main.min.js${toFileName}`))
      .pipe($.replace(regCss, `main.min.css${toFileName}`))
      .pipe(gulp.dest(conf.html.dest))
  );
});
