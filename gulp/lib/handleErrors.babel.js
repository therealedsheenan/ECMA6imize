import notify from 'gulp-notify'

let handleErrors = ( error, cb ) => {
    notify
        .onError(
            error.toString()
            .split(': ').join(':\n')
        )
        .apply(this, arguments)
    if (typeof this.emit === 'function') this.emit('end')
}

export default handleErrors
