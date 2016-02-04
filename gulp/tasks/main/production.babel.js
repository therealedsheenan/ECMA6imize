import gulp from 'gulp'
import rs from 'run-sequence'

gulp.task('production', ['html', 'styles', 'browserify', 'browserSync', 'watch'] );


let runProduction = ( cb ) => {
    rs(
        'clean',
        ['copy-imagemin', 'copy-fonts', 'html', 'styles', 'browserify'],
        ['browserSync', 'watch'],
        cb
    )
}

gulp.task('production', runProduction)
