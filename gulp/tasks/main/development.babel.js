import gulp from 'gulp'
import rs from 'run-sequence'

let runDefault = ( cb ) => {
    rs(
        ['clean', 'svgstore'],
        ['copy-imagemin', 'copy-fonts', 'html', 'styles', 'watchify'],
        ['browserSync', 'watch'],
        cb
    )
}

gulp.task('development', runDefault)
