import gulp from 'gulp'
import bundleAll from './browserify.babel'

let watchifyBundle = () => {
    return bundleAll( true )
}

gulp.task('watchify', watchifyBundle )
