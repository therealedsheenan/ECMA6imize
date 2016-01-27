import gulp from 'gulp'
import rs from 'run-sequence'

let runDefault = ( cb ) => {
    rs(
        'clean',
        ['copy:imagemin', 'html', 'styles', 'watchify'],
        ['browserSync', 'watch'],
        cb
    )
}

gulp.task('default', runDefault )
