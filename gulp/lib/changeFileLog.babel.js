import path from 'path'
import gutil from 'gulp-util'

module.exports = ( filePath, msg ) => {
    if ( msg == null ) msg = '';
    return gutil.log(gutil.colors.green(path.relative(process.cwd(), filePath)) + ' ' + gutil.colors.blue( msg ));
}
