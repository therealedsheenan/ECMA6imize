import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'

import gulp from 'gulp'
import jade from 'gulp-jade'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import path from 'path'

const dest = gulp.dest

//main template generator
let template = () => {
    gulp.src( config.html.src )

        .pipe(plumber())
        .on('error', handleErrors)
        .pipe(jade( {
            basedir: '_src',
            pretty: true,
            data: {
                site: require(path.resolve( config.html.data ))
            }
        }))
        .pipe(dest( config.html.dest ))
        .pipe(browserSync.reload( config.browserSync.reload ))
}

//fetch .json data
let templateData = () => {
    console.log('this function generates the data....')
}

gulp.task('getData', templateData )
gulp.task('html', ['getData'], template )
