import gulp from 'gulp'
import rs from 'run-sequence'

let runDefault = ( cb ) => {
    console.log('EEEEEEE   CCCCC  MM      MM      A          66666666    ii                  ii           eeeee  ');
    console.log('EEE      CC      MM M  M MM     A  A       66               mm mm     mmm       zzzzzz  e     e ');
    console.log('EEEEE    CC      MM   M  MM    AAAAAAA     666666666    ii  mmm  mm mm  mm  ii     zz  eeeeeeee ');
    console.log('EEE      CC      MM      MM   AA     AA    66     66    ii  mm    mmm   mm  ii   zz    e        ');
    console.log('EEEEEEE   CCCCC  MM      MM  AA        AA  666666666    ii  mm    mm    mm  ii  zzzzzz  eeeeeee ');
    console.log('');
    console.log('By: Sheenan Tenepre');
    console.log('');

    rs(
        ['clean', 'svgstore', 'modernizr'],
        ['copy-imagemin', 'copy-fonts', 'html', 'styles', 'watchify'],
        ['browserSync', 'watch'],
        cb
    )
}

gulp.task('development', runDefault)
