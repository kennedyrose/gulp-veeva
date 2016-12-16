// Downloads google fonts
'use strict'
module.exports = function(gulp, config, plugins){

	gulp.task('prefonts', function(){
		return gulp.src(config.src + '/' + config.style + '/_fonts.scss')
			.pipe(clean())
	})
	gulp.task('buildfonts', function(cb){
		gulp.src(config.src + '/' + config.fonts + '/**/*.ttf')
			.pipe(fontmin())
			.pipe(gulp.dest(config.dist + '/' + config.fonts))
			.on('end', cb)
	})
	gulp.task('postfonts', function(cb){
		gulp.src(config.dist + '/' + config.fonts + '/**/*.css')
			.pipe(vinylPaths(del))
			.pipe(concat('_fonts.scss'))
			.pipe(replace(/url\(\"/g, 'url("' + config.fonts + '/'))
			.pipe(gulp.dest(config.src + '/' + config.style))
			.on('end', cb)
			.pipe(notify("Fonts converted"))
	})

	gulp.task('fonts', function(cb){
		plugins.runSequence('prefonts', 'buildfonts', 'postfonts', cb)
	})


}