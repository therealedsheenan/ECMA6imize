import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'

import gulp from 'gulp'
import del from 'del'

let clean = ( cb ) => {
    del(config.del.dest, cb)
}

gulp.task('clean', clean)
