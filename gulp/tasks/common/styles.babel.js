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
import simpleVars from 'postcss-simple-vars'
import rename from 'gulp-rename'
import sass from 'gulp-ruby-sass'
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'

const dest = gulp.dest
const dev = env !== config.build.prod
const cssTools = [
    atImport,
    simpleVars,
    cssnext,
    nested,
    autoprefixer( config.styles.autoprefixer ),
    mqpacker
]

let generateStyles = () => {
    let styleFile = config.styles.src.development
    let options = {
        style: 'expanded',
        unixNewlines: true,
        defaultEncoding: 'UTF-8'
    }

    if ( !dev )  {
        styleFile = config.styles.production
    } else {
        options.sourcemap = true
    }

    let renameFile = ( path ) => {
        path.basename = config.styles.destFileName
    }

    return sass(styleFile, options)
        .pipe(plumber())
        .on('error', handleErrors)
        .pipe(postcss( cssTools ))
        .pipe(sourcemaps.write())
        .pipe(gulpif(dev, sourcemaps.write()))
        .pipe(rename( renameFile ))
        .pipe(dest( config.styles.dest ))
        // .pipe(browserSync.reload( { stream: true, once: true } ))
        .pipe(gulpif(dev, browserSync.reload( config.browserSync.reload )))
}

gulp.task('styles', generateStyles)
