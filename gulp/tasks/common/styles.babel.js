import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'
import env from '../../lib/env.babel'

import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnext from 'postcss-cssnext'
import nested from 'postcss-nested'
import atImport from 'postcss-import'
import mqpacker from 'css-mqpacker'
import minify from 'cssnano'
import rename from 'gulp-rename'
import sass from 'gulp-ruby-sass'
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'

const dest = gulp.dest
const dev = env

const cssTools = [
    atImport,
    cssnext,
    nested,
    autoprefixer( config.styles.autoprefixer ),
    mqpacker
]
const min = [ minify ]

let generateStyles = () => {
    let styleFile = config.styles.src.development
    let options = {
        sourcemap: true,
        style: 'expanded',
        unixNewlines: true,
        defaultEncoding: 'UTF-8'
    }

    let renameFile = ( path ) => {
        path.basename = config.styles.destFileName
    }

    return sass(styleFile, options)
        .pipe(plumber())
        .on('error', handleErrors)
        .pipe(postcss( cssTools ))
        .pipe(gulpif(dev == config.build.prod, postcss( min )))
        .pipe(gulpif(dev == config.build.dev, sourcemaps.write()))
        .pipe(rename( renameFile ))
        .pipe(dest( config.styles.dest ))
        .pipe(gulpif(dev == config.build.dev, browserSync.reload( config.browserSync.reload )))
}

gulp.task('styles', generateStyles)
