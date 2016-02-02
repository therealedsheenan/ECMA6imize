import config from '../../config.babel'
import changeFileLog from '../../lib/changeFileLog.babel'

import gulp from 'gulp';

let watchData = ['styles' ,'html' ,'copyImg' ,'copyFonts'];

gulp.task('watch', () => {
    let watchFiles = [];
    watchData.forEach( ( k,v ) => {
        let tasks = [watchData[v]];
        let files = config[k].watchFiles || config[k].src;
        watchFiles = watchFiles.concat( files );
        gulp.watch (files, tasks);
    });

    gulp.watch( watchFiles ).on("change", ( evt ) => {
        changeFileLog(evt.path, evt.type)
    });
});
