import notify from 'gulp-notify'

let handleErrors = ( error, cb ) => {
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error %>'
    }).apply(this, args);
    return this.emit('end');
}

export default handleErrors
