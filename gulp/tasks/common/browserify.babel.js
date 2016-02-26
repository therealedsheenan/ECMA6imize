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
import uglify from 'gulp-uglify'
import saveLicense from 'uglify-save-license'

const dev = env
const dest = gulp.dest

let bundleAll = () => {
    let bundleThis = ( bundleConfig ) => {
        if ( dev == config.build.dev ) {
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
                .pipe(gulpif( dev == config.build.prod, buffer()) )
                .pipe(gulpif( dev == config.build.prod, uglify({ preserveComments: saveLicense })) )
                .pipe(dest( bundleConfig.dest ))
                .pipe(gulpif( dev == config.build.dev ,browserSync.reload( config.browserSync.reload )))
        }

        if ( dev == config.build.dev ) {
            pkg = watchify( pkg )
            pkg.on('update', ( e ) => {
                e.forEach( ( v ) => {
                    changeFileLog(v, 'changed')
                } )
                bundle()
            })
            pkg.on('log', gutil.log)
            bundleLogger.watch( bundleConfig.outputName )
        }

        if ( bundleConfig.require ) {
            bundleConfig.forEach( v => {
                pkg.require( v )
            })
        }

        if ( bundleConfig.external ) {
            bundleConfig.forEach( v => {
                pkg.external( v )
            })
        }

        return bundle()
    }

    return ms.apply( gulp, _.map(config.browserify.bundleConfigs, bundleThis))
}

gulp.task('browserify', () => {
    bundleAll()
} )

export default bundleAll
