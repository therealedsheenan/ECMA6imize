import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'
import bundleLogger from '../../lib/bundleLogger.babel'

import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import watchify from 'watchify'
import babel from 'babelify'
import browserSync from 'browser-sync'
import es from 'event-stream'
import _ from 'lodash'

let bundleAll = () => {
    let bundleThis = ( config ) => {
        let bundler = watchify(browserify(config, { debug: true, extensions: config.extensions }).transform(babel));
        let rebundle = () => {
            bundleLogger.start( config.outputName )
            bundler
                .bundle()
                .on('error', handleErrors)
                .pipe(source( config.outputName ))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(config.dest))
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

    // config.browserify.bundleConfigs.forEach( bundleThis ) //working
    return es.merge.apply( _.map(config.browserify.bundleConfigs, bundleThis) );
}


gulp.task('browserify', bundleAll );
