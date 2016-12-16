// Controls file watching & live reload
'use strict'
module.exports = function(gulp, config, plugins){

	// Watches files for changes
	gulp.task('watch', function(){
		
		gulp.watch(config.src + '/**/*.scss', ['veevastyle'])
		gulp.watch(config.src + '/**/*.js', ['veevascript'])
		gulp.watch(config.src + '/**/*.pug', ['veevahtml'])

		gulp.watch([
			config.src + '/**/*.{png,jpg,gif,psd}',
			'!' + config.src + '/' + config.img + '/sprite**',
			'!' + config.src + '/' + config.img + '/sprite**/*.svg',
		], ['veevaimg'])


		// Reload browser
		gulp.watch(config.dist + '/**/*.html', plugins.browserSync.reload)
		gulp.watch(config.dist + '/**/*.js', plugins.browserSync.reload)

	})







	// Watch and browser sync tasks
	gulp.task('default', ['sync', 'watch'])



}