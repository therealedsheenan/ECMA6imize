import gutil from 'gulp-util'
import prettyHrtime from 'pretty-hrtime'
let startTime

let bundleLogger = {
    start: ( filepath ) => {
        startTime = process.hrtime()
        gutil.log('Bundling', gutil.colors.green(filepath))
    },

    watch: ( bundleName ) => {
        gutil.log('Watching files: ', gutil.colors.yellow(bundleName))
    },

    end: ( filepath ) => {
        var taskTime = process.hrtime( startTime )
        var prettyTime = prettyHrtime( taskTime )
        gutil.log('Bundled', gutil.colors.green( filepath ), 'in', gutil.colors.magenta( prettyTime ))
    }
}

export default bundleLogger
