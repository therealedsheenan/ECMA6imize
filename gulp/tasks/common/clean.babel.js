import config from '../../config.babel'

import gulp from 'gulp'
import del from 'del'

let clean = () => {
    return del( config.del.dest )
}

gulp.task('clean', clean)
