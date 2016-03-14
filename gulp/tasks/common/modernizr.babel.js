import config from '../../config.babel'

import gulp from 'gulp'
import createFile from 'create-file'
import modernizr from 'modernizr'
import path from 'path'

let generateModernizr = () => {
    let destPath = path.resolve( config.modernizr.dest )
    let buildOption = require( path.resolve( config.modernizr.config ) )

    modernizr.build( buildOption , ( result ) => {
        createFile(config.modernizr.dest, result, ( err ) => {
            if ( err ) console.log( err )
        })
    })
}

gulp.task('modernizr', generateModernizr)
