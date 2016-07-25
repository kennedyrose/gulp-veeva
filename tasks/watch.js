// Controls file watching & live reload
'use strict'
module.exports = function(gulp, config, plugins){

	// Watches files for changes
	gulp.task('watch', function(){
		
		gulp.watch(config.src + '/**/*.scss', ['style'])
		gulp.watch(config.src + '/**/*.js', ['script'])
		gulp.watch(config.src + '/**/*.pug', ['html'])

		gulp.watch([
			config.src + '/**/*.{png,jpg,gif,psd}',
			'!' + config.src + '/' + config.img + '/sprite**',
			'!' + config.src + '/' + config.img + '/sprite**/*.svg',
		], ['veevaimg'])


		// Reload browser
		gulp.watch([
			config.dist + '/**/*',
			'!' + config.dist + '/**/*.css'
		], plugins.browserSync.reload)

	})




	// Watch and browser sync tasks
	gulp.task('default', ['sync', 'watch'])



}