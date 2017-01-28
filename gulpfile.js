var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    typescript = require("gulp-typescript"),
    tsProject = typescript.createProject('tsconfig.json'),
    config = require("./gulp.config.js")(),
    precss = require("precss"),
    postcss = require("gulp-postcss"),
    cssnano = require("cssnano"),
    autoprefixer = require("autoprefixer"),
    ext_replace  = require("gulp-ext-replace"),
    imagemin = require("gulp-imagemin"),
    jsuglify = require('gulp-uglify'),
    plumber = require("gulp-plumber"),
    gulpCopy = require('gulp-copy'),
    clean = require('gulp-clean'),
    del = require('del'),
    concat = require("gulp-concat");

gulp.task("compile-ts", function(){

  return gulp.src(config.TsFilePath)
             .pipe(plumber({
              errorHandler: function (err) {
                  console.log(err);
                  this.emit('end');
                }
              }))
             .pipe(sourcemaps.init())
             .pipe(tsProject())
             .pipe(jsuglify({
                mangle: false
              }))
             .pipe(sourcemaps.write("."))
             .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task("compile-styles", function() {

    return gulp.src(config.stylesFilePath)
               .pipe(plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                  }
                }))
               .pipe(sourcemaps.init())
               .pipe(postcss([precss,cssnano,autoprefixer]))
               .pipe(ext_replace(".css"))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest(config.cssOutputPath));
});

gulp.task("minify-images", function() {

  return gulp.src(config.imagesFilePath)
             .pipe(plumber({
              errorHandler: function (err) {
                  console.log(err);
                  this.emit('end');
                }
              }))
             .pipe(imagemin({
                progressive: true
              }))
             .pipe(gulp.dest(config.imagesOutputPath));
});

gulp.task("setup",["compile-ts","compile-styles","minify-images"], function(){

  gulp.src(config.bootstrapJSPath)
      .pipe(gulp.dest(config.bootstrapJSDestPath));

  gulp.src(config.bootstrapCSSPath)
      .pipe(gulp.dest(config.bootstrapCSSDestPath));

  gulp.src(config.bootstrapFontsPath)
      .pipe(gulp.dest(config.bootstrapFontsDestPath))

  gulp.src(config.jQueryPath)
      .pipe(gulp.dest(config.jQueryDestPath));
});

gulp.task("clean", function(){
    return del(config.cleanPath);
});
gulp.task("copy", function(){
    return gulp
    .src(config.pathsToCopy)
    .pipe(gulpCopy(config.distPath));
});

gulp.task("build", ["clean", "setup", "copy"],  function(){
    return gulp;
});

gulp.task('watch', function () {
    gulp.watch(config.TsFilePath, ['compile-ts']);
    gulp.watch(config.stylesFilePath, ['compile-styles']);
    gulp.watch(config.imagesFilePath, ['minify-images']);
});

gulp.task('default', ['watch']);
