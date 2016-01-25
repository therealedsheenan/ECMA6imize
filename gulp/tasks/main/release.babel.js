import config from '../../config.babel.js'

import gulp from 'gulp'

gulp.task('release', ['html', 'styles', 'browserify', 'browserSync', 'watch'] );
