import gulp from 'gulp'
import rs from 'run-sequence'

let runProduction = ( cb ) => {
    rs(
        ['clean', 'svgstore'],
        ['copy-imagemin', 'copy-fonts', 'html', 'styles', 'browserify', 'credits'],
        cb
    )
}

gulp.task('production', runProduction)
