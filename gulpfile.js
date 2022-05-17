const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const webpack = require("webpack");
const fileInclude = require("gulp-file-include");

gulp.task('fonts', function () {
  return gulp.src('dist/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// kompilacja do css
const css = function() {
  return gulp.src("src/scss/style.scss")
      .pipe(sourcemaps.init()) //odpalenie sourcemap przed zabawa na plikach
      .pipe(
          sass({
              outputStyle : "compressed"
          }).on("error", sass.logError)
      )
      .pipe(autoprefixer()) //autoprefixy https://github.com/browserslist/browserslist#queriess
      .pipe(sourcemaps.write(".")) //po modyfikacjach na plikach zapisujemy w pamięci sourcemap
      .pipe(gulp.dest("dist/css"));
}

const html = function(cb) {
  return gulp.src('index.html')
      .pipe(fileInclude({
          prefix: '@@',
          basepath: '@file'
      }))
      .pipe(gulp.dest('dist'))
}

const htmlReload = function(cb) {
  browserSync.reload();
  cb();
}

const js = function(cb) { //https://github.com/webpack/docs/wiki/usage-with-gulp#normal-compilation  //JS
  return webpack(require("./webpack.config.js"), function(err, stats) {
      if (err) throw err;
      console.log(stats);
      browserSync.reload();
      cb();
  })
}


const watch = function(cb) {
  gulp.watch("./index.html", gulp.series(html, htmlReload));
  gulp.watch("src/scss/**/*.scss", gulp.series(css));
  gulp.watch("dist/**/*.html").on("change", browserSync.reload);
  cb();
  gulp.watch("src/js/**/*.js", gulp.series(js));
  
}

exports.html = html;
exports.watch = watch;
exports.css = css;
exports.js = js;
exports.default = gulp.series(css, js, html, watch, htmlReload);//domyślne zadanie




