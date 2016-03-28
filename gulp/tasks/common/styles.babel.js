import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'
import env from '../../lib/env.babel'
import stylelintConfig from '../../lib/styleLintConfig.babel'

import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import minify from 'cssnano'
import stylelint from 'stylelint'
import mqpacker from 'css-mqpacker'
import rename from 'gulp-rename'
import syntax_scss from 'postcss-scss'
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import rucksack from 'gulp-rucksack'

import sass from 'gulp-sass'

const dest = gulp.dest
const dev = env

const cssTools = [
    stylelint( stylelintConfig ),
    mqpacker
]

const min = [ minify ]

let generateStyles = () => {
    let styleFile = config.styles.src.development
    let options = {
        sourcemap: true,
        outputStyle: 'expanded',
        unixNewlines: true,
        defaultEncoding: 'UTF-8',
        includePaths: require('node-bourbon').includePaths
    }

    let renameFile = ( path ) => {
        path.basename = config.styles.destFileName
    }

    return gulp.src( styleFile )
        .pipe(plumber({ handleErrors: handleErrors }))
        .pipe(sass( options ).on('error', sass.logError))
        .pipe(rucksack())
        .pipe(postcss( cssTools ), { syntax: syntax_scss })
        .pipe(gulpif(dev == config.build.prod, postcss( min )))
        .pipe(gulpif(dev == config.build.dev, sourcemaps.write()))
        .pipe(rename( renameFile ))
        .pipe(dest( config.styles.dest ))
        .pipe(gulpif(dev == config.build.dev, browserSync.reload( config.browserSync.reload )))
}

gulp.task('styles', generateStyles)
