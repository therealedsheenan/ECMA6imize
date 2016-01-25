// Sources
const SRC_DIR = `_src`;
const DEST_DIR = '_dist';
const CSS_GLOB = `${ SRC_DIR }/assets/styles/main.css`;
const CSS_DEST = `${ DEST_DIR }/assets/styles`;
const CSS_SRC = `${ SRC_DIR }/assets/styles`;
const SCRIPTS_SRC = `${ SRC_DIR }/assets/scripts`;
const SCRIPTS_DEST = `${ DEST_DIR }/assets/scripts`;
const HTML_SRC = `${ SRC_DIR }/html`;
const HTML_DEST = `${ DEST_DIR }`;

let production = false;

module.exports = {
    isProduction: production,
    dir: {
        src: SRC_DIR,
        dest: DEST_DIR
    },

    build: {
        dev: 'development',
        prod: 'production'
    },

    browserSync: {
        server: {
            baseDir: DEST_DIR
        },
        startPath: '',
        port: 3000,
        browser: "FirefoxDeveloperEdition",
        ghostMode: {
            clicks: false,
            scroll: false,
            links: false,
            forms: false
        }
    },

    styles: {
        src: {
            partials: `${ CSS_SRC }/**/*.scss`,
            development: `${ CSS_SRC }/main-dev.scss`,
            production: `${ CSS_SRC }/main.scss`
        },
        dest: CSS_DEST,
        destFileName: 'main',
        watchFiles: [
            `${ CSS_SRC }/main-dev.scss`,
            `${ CSS_SRC }/**/*.scss`,
            `${ CSS_SRC }/**/**/*.scss`
        ],
        autoprefixer: 'last 2 versions'
    },

    html: {
        src: [
            `${ HTML_SRC }/**/*.jade`,
            `!${ HTML_SRC }/base/**/*.jade`,
            `!${ HTML_SRC }/**/_*.jade`,
        ],
        dest: HTML_DEST,
        data: `${ HTML_DEST }/`,
        watchFiles: [
            `${ HTML_SRC }/**/*.jade`,
            `${ HTML_SRC }/**/*.yml`,
            `${ HTML_SRC }/**/*.json`
        ]
    },

    browserify: {
        transform: ['babelify'],
        bundleConfigs: [
            {
                entries: [`${ SCRIPTS_SRC }/main.babel.js`],
                dest: `${ SCRIPTS_DEST }/`,
                outputName: 'main.js',
                // require: ['config','libs/modernzr'],
                extensions: ['.js']
            },
            {
                entries: [`${ SCRIPTS_SRC }/head.babel.js`],
                dest: `${ SCRIPTS_DEST }/`,
                outputName: 'head.js',
                // require: ['jquery'],
                extensions: ['.js']
            }
        ]
    },

    del: {
        dest: DEST_DIR
    }
}
