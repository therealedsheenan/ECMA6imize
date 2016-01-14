import config from '../../config.babel.js'

import gulp from 'gulp';

gulp.task('watch', () => {
    gulp.watch(config.browserify.src , ['browserify'] )
    gulp.watch(config.html.src, ['html'])
    gulp.watch(config.styles.watchFiles, ['styles'])
});
