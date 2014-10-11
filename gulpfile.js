var gulp = require('gulp');
var config = require('./build.config.js');
var es = require('event-stream');
var request = require('request');
var plugins = require('gulp-load-plugins')();
var fs = require('fs');
var Q = require('q');

var task = { dev: {}, build: {} };

task.clean = function () {
    return gulp.src([config.outputFolder + '/*'], { read: false })
        .pipe(plugins.rimraf());
};

task.assetBundles = function() {
	var promises = [];

    config.assetBundles.forEach(function(bundle) {
        var defer = Q.defer();
        var pipeline = gulp.src(bundle.files)
            .pipe(gulp.dest(bundle.targetFolder));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });
    return Q.all(promises);
}

task.package = function () {
    return gulp.src(config.outputFolder + '/**/*')
        .pipe(plugins.zip('deploy.zip'))
        .pipe(gulp.dest('./'));
}

task.styleBundles = function() {
    var promises = [];

    config.styleBundles.forEach(function(bundle) {
        var defer = Q.defer();
        var pipeline = gulp.src(bundle.files)
            .pipe(plugins.less({
                compress: true
            }))
            .pipe(plugins.concat(bundle.outputFile))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest(bundle.targetFolder));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });
    return Q.all(promises);
}

task.dev.scriptBundles = function() {
    var promises = [];

    config.scriptBundles.forEach(function(bundle) {
        var defer = Q.defer();
        var pipeline = gulp.src(bundle.files)
            .pipe(plugins.concat(bundle.outputFile))
            .pipe(gulp.dest(bundle.targetFolder));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });
    return Q.all(promises);
}

task.build.scriptBundles = function() {
    var promises = [];

    config.scriptBundles.forEach(function(bundle) {
        var defer = Q.defer();
        var pipeline = gulp.src(bundle.files)
            .pipe(plugins.uglify())
            //.pipe(plugins.obfuscate())
            .pipe(plugins.concat(bundle.outputFile))
            .pipe(gulp.dest(bundle.targetFolder));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });
    return Q.all(promises);
}

gulp.task('clean', task.clean);

gulp.task('asset-bundles', ["clean"], task.assetBundles);

gulp.task('style-bundles', ["clean"], task.styleBundles);

if (config.buildConfiguration == "debug") {
    console.log("Building in debug mode");
    gulp.task('script-bundles', ["clean"], task.dev.scriptBundles);

} else {
    console.log("Building in release mode");
    gulp.task('script-bundles', ["clean"], task.build.scriptBundles);
}

gulp.task('default', ["clean", "asset-bundles", "script-bundles", "style-bundles"]);