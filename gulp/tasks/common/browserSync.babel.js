import config from '../../config.babel.js'

import gulp from 'gulp'
import browserSync from 'browser-sync'

let browserLoad = () => {
    browserSync( config.browserSync )
}

gulp.task('browserSync', browserLoad)
