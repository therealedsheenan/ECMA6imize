import gulp from 'gulp'

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
