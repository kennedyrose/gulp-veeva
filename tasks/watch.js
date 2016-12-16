// Controls file watching & live reload
'use strict'
module.exports = function(gulp, config, plugins){

	// Watches files for changes
	gulp.task('watch', function(){
		
		gulp.watch(config.src + '/**/*.scss', ['style'])
		gulp.watch(config.src + '/**/*.js', ['script'])
		gulp.watch(config.src + '/**/*.pug', ['html'])

		gulp.watch([
			config.src + '/' + config.img + '/**/*',
			'!' + config.src + '/' + config.img + '/sprite**',
			'!' + config.src + '/' + config.img + '/sprite**/*.svg',
		], ['img'])

		gulp.watch([
			config.src + '/' + config.img + '/sprite**',
			config.src + '/' + config.img + '/sprite**/*.svg',
		], ['svg'])

		gulp.watch(config.src + '/' + config.fonts + '/**/*.ttf', ['fonts'])
		gulp.watch(config.src + '/' + config.fonts + '/google-fonts.list', ['googlefonts'])
		gulp.watch(config.src + '/' + config.icons + '**/*.{png,svg,jpg,gif}', ['icons'])

		// Reload browser
		gulp.watch(config.dist + '/**/*.html', plugins.browserSync.reload)
		gulp.watch(config.dist + '/**/*.js', plugins.browserSync.reload)

	})


	

	// Creates a PHP server
	gulp.task('phpserver', function(){
		plugins.connectPhp.server({
			base: config.dist
		}, function (){
			plugins.browserSync.init({
				notify: false,
				proxy: config.phpProxy
			})
		})
	})






	// Watch and browser sync tasks
	gulp.task('default', ['sync', 'watch'])
	gulp.task('php', ['phpserver', 'watch']);



}