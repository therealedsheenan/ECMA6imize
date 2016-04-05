import gulp from 'gulp'
import rs from 'run-sequence'

let runDefault = ( cb ) => {
    rs(
        ['clean', 'svgstore', 'modernizr'],
        ['copy-imagemin', 'copy-fonts', 'html', 'styles', 'watchify'],
        ['browserSync', 'watch', 'credits'],
        cb
    )
}

gulp.task('development', runDefault)
