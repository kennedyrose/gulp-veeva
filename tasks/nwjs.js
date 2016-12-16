// Builds dist directory to an application
'use strict'
module.exports = function(gulp, config, plugins){

	gulp.task('nwjs', function(){
		var nw = new nwBuilder({
			files: config.dist + '/**/*',
			platforms: config.platforms
		})
		nw.on('log', console.log)

		nw.build().then(function(){
			console.log('nw.js apps built!')
		}).catch(function(err){
			console.error(err)
		})
	})


}