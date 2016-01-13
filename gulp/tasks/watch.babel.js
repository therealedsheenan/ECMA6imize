import config from '../config.babel.js'
import gulp from 'gulp';

gulp.task('watch', () => {
    gulp.watch(config.browserify.src , ['browserify'] )
});
