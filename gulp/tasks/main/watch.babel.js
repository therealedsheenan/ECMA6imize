import config from '../../config.babel'
import changeFileLog from '../../lib/changeFileLog.babel'

import gulp from 'gulp';

gulp.task('watch', () => {
    let watchFiles = [
        config.styles.watchFiles,
        config.html.watchFiles,
        config.copyImg.watchFiles,
        config.copyFonts.watchFiles,
        config.svgstore.watchFiles,
        config.modernizr.watchFiles
    ]

    gulp.watch(config.styles.watchFiles, ['styles'])
    gulp.watch(config.html.watchFiles, ['html'])
    gulp.watch(config.svgstore.watchFiles, ['svgstore'])
    gulp.watch(config.modernizr.watchFiles, ['modernizr'])
    gulp.watch(config.copyImg.watchFiles, ['copy-imagemin'])
    gulp.watch(config.copyFonts.watchFiles, ['copy-fonts'])

    gulp.watch( watchFiles ).on("change", ( evt ) => {
        changeFileLog(evt.path, evt.type)
    });
});
