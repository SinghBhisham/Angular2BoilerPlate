module.exports = function() {
  var config = {
    distPath: "./dist/",
    cleanPath: ".dist/**/*",
    pathsToCopy: [
        "./app/**/*",
        "./public/**/*",
        "./templates/**/*",
        "./index.html",
        "./node_modules/**/*",
        "./systemjs.config.js"
    ],
    indexSrcPath: "./index.html",
    indexOutputPath: "./dist",
    TsFilePath: "./src/**/*.ts",
    tsOutputPath: "./app/",
    stylesFilePath: "./scss/*.scss",
    cssOutputPath: "./public/css/",
    imagesFilePath: "./public/images/**/*",
    imagesOutputPath: "./public/images/",
    bootstrapJSPath: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    bootstrapCSSPath: "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    bootstrapJSDestPath: "./lib/bootstrap/js",
    bootstrapCSSDestPath: "./lib/bootstrap/css",
    bootstrapFontsPath: "./node_modules/bootstrap/fonts/*",
    bootstrapFontsDestPath: "./lib/bootstrap/fonts",
    jQueryPath: "./node_modules/jquery/dist/jquery.min.js",
    jQueryDestPath: "./lib/jquery"
  }

  return config;
}