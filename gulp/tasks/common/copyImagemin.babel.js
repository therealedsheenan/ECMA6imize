import config from '../../config.babel'
import env from '../../lib/env.babel'

import gulp from 'gulp'
import gulpif from 'gulp-if'
import changed from 'gulp-changed'
import browserSync from 'browser-sync'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'

const dev = env !== config.build.prod
const dest = gulp.dest

let copyImagemin = () => {
    gulp.src( config.copyImg.src )
        .pipe(changed( config.copyImg.dest ))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: config.copyImg.svgoPlugins,
            use: [ pngquant( config.copyImg.pngquant ) ]
        }))
        .pipe(dest( config.copyImg.dest ))
        .pipe(gulpif(!dev, browserSync.reload( config.browserSync.reload )))
}

gulp.task('copy-imagemin', copyImagemin)
