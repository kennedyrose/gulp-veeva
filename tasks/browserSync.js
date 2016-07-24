// Live browser reload (client code only)
'use strict'
module.exports = function(gulp, config, plugins){
	gulp.task('sync', function(){
		console.log(config.dist + '/' + config.veeva.id + '01')
		plugins.browserSync.init({
			notify: false,
			port: 8080,
			server: {
				baseDir: config.dist,
				directory: true
			}
		})
	})
}