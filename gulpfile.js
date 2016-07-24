// Config
var config = {}

// Load plugins
var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins()

plugins.browserSync = require('browser-sync').create()
plugins.glob = require('glob-all')
plugins.runSequence = require('run-sequence')
for(var i in plugins){
	global[i] = plugins[i]
}

// Load tasks
var files = glob.sync('./tasks/*.js')
for(var i = 0; i < files.length; i++){
	require(files[i])(gulp, config, plugins)
}


















