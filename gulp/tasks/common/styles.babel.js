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
import reporter from 'postcss-reporter'
import mqpacker from 'css-mqpacker'
import minify from 'cssnano'
import simpleVars from 'postcss-simple-vars'
import doiuse from 'doiuse'
import rename from 'gulp-rename'
import rsass from 'gulp-ruby-sass'
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'

const dest = gulp.dest
const dev = env !== config.build.prod
const postprocess = [
    reporter( config.styles.reporter ),
    simpleVars,
    cssnext,
    nested,
    autoprefixer( config.styles.autoprefixer ),
    mqpacker,
    doiuse({
        browsers: config.styles.browsers,
        ignore: config.styles.ignore,
        ignoreFiles: config.styles.ignoreFiles,
        onFeatureUsage: function ( info ) {
            console.log( info.message )
        }
    }),
    atImport,
    minify
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

    return rsass( styleFile, options )
        .pipe( plumber() )
        .on( 'error', handleErrors )
        .pipe(postcss( postprocess ))
        .pipe(gulpif( dev, sourcemaps.write() ))
        .pipe(rename( renameFile ))
        .pipe(dest( config.styles.dest ))
        .pipe(gulpif( dev, browserSync.reload( config.browserSync.reload ) ))
}

gulp.task('styles', generateStyles)
