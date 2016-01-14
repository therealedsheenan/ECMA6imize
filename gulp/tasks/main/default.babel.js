import config from '../../config.babel.js'

import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('default', ['html', 'styles', 'browserify', 'browserSync', 'watch'] );
