import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';

gulp.task('build', () => {
    return compile();
});

gulp.task('watch', () => {
    return watch();
});

gulp.task('default', ['watch']);

let compile = ( dev ) => {
    let bundler = watchify(browserify("_src/assets/js/app.js", { debug: true }).transform(babel));

    let rebundle = () => {
        bundler.bundle()
            .on('error', ( err ) => {
                console.error( err );
                this.emit('end');
            })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./_dist'));
    }

    if ( dev ) {
        bundler.on('update', () => {
            console.log('bundling...');
            rebundle();
        });
    }
    rebundle();
}

var watch = () => {
    return compile( true );
}
