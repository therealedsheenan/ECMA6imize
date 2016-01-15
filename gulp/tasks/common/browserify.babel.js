import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'

import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import watchify from 'watchify'
import babel from 'babelify'
import browserSync from 'browser-sync'

let bundleAll = () => {
    let bundler = watchify(browserify(config.browserify.src, { debug: true }).transform(babel));
    let rebundle = () => {
        bundler
            .bundle()
            .on('error', handleErrors)
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.browserify.dest))
            .pipe(browserSync.reload( { stream: true, once: true } ))
    }

    if ( !config.isProduction ) {
        bundler.on('update', () => {
            console.log('bundling...');
            rebundle();
        });
    }

    rebundle();
}

gulp.task('browserify', bundleAll );
