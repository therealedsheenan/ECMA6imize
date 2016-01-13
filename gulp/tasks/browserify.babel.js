import config from '../config.babel.js'
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';
import del from 'del';


gulp.task('browserify', () => {
    let bundler = watchify(browserify(config.browserify.src, { debug: true }).transform(babel));
    let rebundle = () => {
        bundler.bundle()
            .on('error', ( err ) => {
                console.error( err );
                this.emit('end');
            })
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.browserify.dest));
    }

    if ( !config.isProduction ) {
        bundler.on('update', () => {
            console.log('bundling...');
            rebundle();
        });
    }

    rebundle();
});
