'use strict';
/* eslint import/no-commonjs: 0*/
/* eslint no-console: 0 */
let autoprefixer = require('gulp-autoprefixer');
let babelify = require('babelify');
let browserify = require('browserify');
let browserSync = require('browser-sync');
let buffer = require('vinyl-buffer');
let concat = require('gulp-concat');
let configProd = require('./config/production.json');
let configStage = require('./config/stage.json');
let es = require('event-stream');
let eslint = require('gulp-eslint');
let exec = require('child_process').exec;
let fs = require('fs');
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let notify = require('gulp-notify');
let rimraf = require('rimraf');
let runSequence = require('run-sequence');
let sass = require('gulp-sass');
let source = require('vinyl-source-stream');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');
let watchify = require('watchify');

const paths = {
  srcCss: 'app/**/*.scss',
  srcFont: 'app/fonts/*.{ttf,woff,woff2,eot,svg}',
  srcImg: 'app/images/**',
  srcComponentLocStrings: 'app/i18n/app',
  dist: 'public',
  distJs: 'public/js',
  distCss: 'public/css',
  distFont: 'public/css/font',
  distImg: 'public/images',
  srcLintClient: ['app/**/*.js', 'app/**/*.jsx'],
  srcLintServer: ['*.js', 'models/**/*.js', 'views/**/*.js', 'controllers/**/*.js']
};

const bundles = [{
  bundleFile: 'app.js',
  srcJsx: 'app/client.js'
}, {
  bundleFile: 'error.js',
  srcJsx: 'app/components/AppError/AppError.jsx'
}];

let customBrowserifyOpts = {
  extensions: ['.jsx'],
  debug: true
};

gulp.task('clean', ['cleanDist', 'cleanComponentLocStrFiles']);

gulp.task('cleanComponentLocStrFiles', callback => {
  rimraf(paths.srcComponentLocStrings, callback);
});

gulp.task('cleanDist', callback => {
  rimraf(paths.dist, callback);
});

gulp.task('nodemon', callback => {
  var started = false;

  return nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['public'],
    env: { 'NODE_ENV': process.env.NODE_ENV }
  }).on('start', () => {
    if(!started) {
      setTimeout(callback, 2500);
      started = true;
    }
  });
});

gulp.task('browserSync', ['nodemon'], () => {
  browserSync({
    proxy: 'http://localhost:8080',
    reloadDelay: 1000
  });
});

function makeBundle(bundler, bundleFile) {
  return bundler
    .bundle()
    .pipe(source(bundleFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs));
}

gulp.task('watchify', function() {
  let tasks = bundles.map(function(bundle) {
    let opts = Object.assign({}, watchify.args, customBrowserifyOpts);

    let bundler = browserify(bundle.srcJsx, opts)
      .plugin(watchify)
      .transform(babelify);

    bundler.on('update', function() {
      makeBundle(bundler, bundle.bundleFile)
      .pipe(notify({
        message: 'Generated file: <%= file.relative %>'
      }));
    });

    return makeBundle(bundler, bundle.bundleFile)
            .pipe(notify({
              message: 'Generated file: <%= file.relative %>'
            }));
  });

  return es.merge.apply(null, tasks);
});

gulp.task('browserify', function() {
  let tasks = bundles.map(function(bundle) {
    let opts = Object.assign({}, watchify.args, customBrowserifyOpts);

    let bundler = browserify(bundle.srcJsx, opts)
      .transform(babelify);

    return makeBundle(bundler, bundle.bundleFile);
  });

  return es.merge.apply(null, tasks);
});

gulp.task('sass', () => {
  return gulp.src(paths.srcCss)
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'compressed' })).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.distCss));
});

gulp.task('copyfonts', function() {
   gulp.src(paths.srcFont)
   .pipe(gulp.dest(paths.distFont));
});

gulp.task('config', () => {
  let configObj = {};

  switch (process.env.NODE_ENV) {
    case 'Production':
      configObj = configProd;
      break;
    default:
      configObj = configStage;
      break;
  }
  let directory = './';
  let path = ['public', 'config'];
  path.forEach(function(dir) {
    directory += dir + '/';
    if (!fs.existsSync(directory)){
      fs.mkdirSync(directory);
    }
  });
  fs.writeFileSync(directory + 'config.json', JSON.stringify(configObj));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', ['lintServer', 'lintClient']);

gulp.task('lintClient', () => {
  return gulp.src(paths.srcLintClient)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lintServer', () => {
  return gulp.src(paths.srcLintServer)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('mergeI18nStrings', () => {
  exec('./node_modules/.bin/babel-node ./tasks/flatten-react-intl-output.js', function (error) {
    if (error !== null) {
      console.error('Error merging i18n strings: ' + error);
    }
  });
});

gulp.task('watchTask', () => {
  bundles.forEach(function(bundle) {
    gulp.watch(bundle.srcJsx, ['lintClient']);
  });
  gulp.watch(paths.srcCss, ['sass']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['config', 'nodemon', 'watchTask', 'watchify', 'sass', 'copyfonts', 'lint', 'images'], 'mergeI18nStrings', cb);
});

gulp.task('build', cb => {
  runSequence('clean', ['config', 'nodemon', 'browserify', 'sass', 'copyfonts', 'lint', 'images'], 'mergeI18nStrings', cb);
});