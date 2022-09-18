const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp/tasks');

gulp.task(
  'default',
  gulp.series(
    'cleanDest',
    gulp.parallel('ejs', 'sass', 'scripts', 'vendorScripts', 'copyToDest', 'imageminWebpDest'),
    // gulp.parallel('ejs', 'sass', 'scripts', 'vendorScripts', 'copyToDest', 'imageminWebpDest'), // webp対応する場合
    gulp.parallel('serve-ejs', 'watch'),
  ),
);

gulp.task(
  'build',
  gulp.series(
    'cleanDest',
    gulp.parallel('ejs', 'sass', 'copyToDest'),
    'cleanBuild',
    gulp.parallel('replaceHtml', 'scripts'),
    gulp.parallel('cleanCss', 'copyToBuild', 'copyImgToBuild', 'imagemin', 'copyJsToBuild', 'copyPhpToBuild'),
    // gulp.parallel('cleanCss', 'copyToBuild', 'copyImgToBuild', 'imagemin', 'imageminWebpBuild', 'copyJsToBuild', 'copyPhpToBuild'), // webp対応する場合
  ),
);

gulp.task('public', gulp.series('copyToPublic', gulp.parallel('serve', 'buildWatch')));
