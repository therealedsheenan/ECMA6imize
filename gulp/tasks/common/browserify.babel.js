import config from '../../config.babel'
import handleErrors from '../../lib/handleErrors.babel'
import bundleLogger from '../../lib/bundleLogger.babel'
import changeFileLog from '../../lib/changeFileLog.babel'
import env from '../../lib/env.babel'

import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import watchify from 'watchify'
import babel from 'babelify'
import browserSync from 'browser-sync'
import ms from 'merge-stream'
import _ from 'lodash'

const dev = env !== config.build.prod

let bundleAll = ( dev ) => {
    let bundleThis = ( bundleConfig ) => {
        if ( dev ) {
            _.extend(bundleConfig, watchify.args, { debug: true })
        }
        let pkg = browserify( bundleConfig )
        pkg.transform( config.browserify.transform )

        let bundle = () => {
            bundleLogger.start( bundleConfig.outputName )
            return pkg
                .bundle()
                .on('error', handleErrors)
                .pipe(source( bundleConfig.outputName ))
                .pipe(gulpif(!dev ,buffer()))
                .pipe(gulp.dest(bundleConfig.dest))
                .pipe(browserSync.reload( { stream: true, once: true } ))
        }

        if ( dev ) {
            pkg = watchify( pkg )
            pkg.on('update', ( e ) => {
                e.forEach( (v) => {
                    changeFileLog(v, 'changed')
                } )
                bundle();
            })
            pkg.on('log', gutil.log)
            bundleLogger.watch( bundleConfig.outputName )
        }

        return bundle()
    }

    return ms.apply( gulp, _.map(config.browserify.bundleConfigs, bundleThis ))
}

gulp.task('browserify', () => {
    bundleAll( dev )
} );

module.exports = bundleAll
