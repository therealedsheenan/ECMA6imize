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
import stylelint from 'stylelint'
import mqpacker from 'css-mqpacker'
import minify from 'cssnano'
import rename from 'gulp-rename'
import sass from 'gulp-ruby-sass'
import syntax_scss from 'postcss-scss'
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const dest = gulp.dest
const dev = env
const stylelintConfig = {
    "rules": {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "function-comma-space-after": "always",
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "max-empty-lines": 5,
    "number-no-trailing-zeros": true,
    "declaration-block-no-single-line": true,
    "rule-trailing-semicolon": "always",
    "selector-list-comma-space-before": "never",
    "selector-list-comma-newline-after": "always"
    }
}

const cssTools = [
    atImport,
    cssnext,
    nested,
    stylelint( stylelintConfig ),
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
        .pipe(plumber( { handleErrors: handleErrors } ))
        .pipe(postcss( cssTools ), { syntax: syntax_scss })
        .pipe(gulpif(dev == config.build.prod, postcss( min )))
        .pipe(gulpif(dev == config.build.dev, sourcemaps.write()))
        .pipe(rename( renameFile ))
        .pipe(dest( config.styles.dest ))
        .pipe(gulpif(dev == config.build.dev, browserSync.reload( config.browserSync.reload )))
}

gulp.task('styles', generateStyles)
