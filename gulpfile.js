// Load options
var config = require('./_config.js')

// Load plugins
var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins({
		pattern: [
			'*',
			'!gulp-grunt',
			'!grunt-responsive-videos',
		]
	}),
	nwBuilder = require('nw-builder')

var grunt = require('gulp-grunt')(gulp, {
	prefix: 'grunt_',
	verbose: false,
})
plugins.fs = require('fs')
plugins.path = require('path')
plugins.childProcess = require('child_process')
plugins.gulpif = plugins.if
plugins.merge = require('event-stream').merge
plugins.glob = require('glob-all')
plugins.browserSync = require('browser-sync').create()
plugins.runSequence = require('run-sequence')
plugins.del = require('del')
plugins.vinylPaths = require('vinyl-paths')
plugins.vinylFtp = require('vinyl-ftp')
plugins.mainBowerFiles = require('main-bower-files')
for(var i in plugins){
	global[i] = plugins[i]
}

// Load tasks
var files = glob.sync('./tasks/*.js')
for(var i = 0; i < files.length; i++){
	require(files[i])(gulp, config, plugins)
}

// Test for errors
gulp.task('test', function(cb){
	cb()
})

















