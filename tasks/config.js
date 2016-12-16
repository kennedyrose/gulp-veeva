// Builds new config file from _config.tpl.js
'use strict'
module.exports = function(gulp, config, plugins){



	gulp.task('config', function(){
		return gulp.src('./_config.tpl.js')
			.pipe(rename('_config.js'))
			.pipe(gulp.dest('./'))
			.pipe(notify("New _config.js built"))
	})





}