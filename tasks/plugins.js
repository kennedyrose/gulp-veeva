// For finding plugin names
'use strict'
module.exports = function(gulp, config, plugins){


	
	gulp.task('plugins', function(cb){
		console.log('\nPLUGINS:')
		var keys = Object.keys(plugins).sort()
		for(var i = 0; i < keys.length; i++){
			console.log(keys[i])
		}
		console.log('')
		cb()
	})

}