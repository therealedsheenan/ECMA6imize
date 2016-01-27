import config from '../../config.babel'
import env from '../../lib/env.babel'

import gulp from 'gulp'
import changed from 'gulp-changed'
import browserSync from 'browser-sync'

const dest = gulp.dest

let copyFonts = () => {
    gulp.src( config.copyFonts.src )
        .pipe(changed( config.copyFonts.dest ))
        .pipe(dest( config.copyFonts.dest ))
}

gulp.task('copy-fonts', copyFonts)
