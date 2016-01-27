import config from '../../config.babel.js'

import gulp from 'gulp'

gulp.task('production', ['html', 'styles', 'browserify', 'browserSync', 'watch'] );
