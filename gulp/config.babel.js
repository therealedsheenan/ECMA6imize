// Sources
const SRC_DIR = `_src`;
const DEST_DIR = '_dist';
const CSS_GLOB = `${SRC_DIR}/assets/styles/main.css`;
const CSS_PARTIALS = '!${SRC_DIR}/assets/styles/**/_*.css';
const CSS_DIR = `${ SRC_DIR }/assets/styles/**/*.css`;
const SCRIPTS_SRC = `${ SRC_DIR }/assets/scripts`;
const SCRIPTS_DEST = `${ DEST_DIR }/assets/scripts`;
let production = false;

module.exports = {
    isProduction: production,
    dir: {
        src: SRC_DIR,
        dest: DEST_DIR
    },

    browserify: {
        dest: SCRIPTS_DEST,
        src: `${SCRIPTS_SRC}/main.js`,
        extensions: ['.js'],
        outputName: 'main.js'
    }
}
