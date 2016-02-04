import config from '../../config.babel'
import env from '../../lib/env.babel'

import gulp from 'gulp'
import browserSync from 'browser-sync'
import svgstore  from 'gulp-svgstore'
import cheerio from 'gulp-cheerio'
import rename from 'gulp-rename'

let processSvg = () => {
    gulp.src( config.svgstore.src )
        .pipe(svgstore( config.svgstore.options ))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('svg').attr('style',  'display:none');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({
            basename: 'symbols'
        }))
        .pipe(gulp.dest( config.svgstore.dest ))
}

gulp.task( 'svgstore', processSvg )
