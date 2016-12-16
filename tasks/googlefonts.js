// Downloads google fonts
'use strict'
module.exports = function(gulp, config, plugins){

	gulp.task('pregooglefonts', function(){
		return gulp.src(config.dist + '/' + config.fonts + '/_google-fonts.scss')
			.pipe(clean())
	})

	var regDist = new RegExp(config.dist + '/',"g")

	gulp.task('buildgooglefonts', function(cb){
		gulp.src(config.src + '/' + config.fonts + '/google-fonts.list')
			.pipe(googleWebfonts({
				fontsDir: config.dist + '/' + config.fonts,
				cssDir: config.src + '/' + config.style,
				cssFilename: '_google-fonts.scss'
			}))
			.pipe(replace(regDist, ''))
			.pipe(gulp.dest(''))
			.on('end', cb)
			.pipe(notify("Google fonts downloaded"))
	})


	gulp.task('googlefonts', function(cb){
		plugins.runSequence('pregooglefonts', 'buildgooglefonts', cb)
	})



}