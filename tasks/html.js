// Preprocesses Pug for development and production
'use strict'
module.exports = function(gulp, config, plugins){

	function html(cb, prod){

		gulp.src([
				config.src + '/**/*.pug',
				'!' + config.src + '/**/_*.pug',
			])
			.pipe(plumber(onError))
			.pipe(pug(prod ? null : {pretty: '\t'}))
			.pipe(gulpif(prod, plugins.htmlmin({
				removeOptionalTags: true,
				removeComments: true
			})))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify("Pug processed for " + (prod ? 'production' : 'development')))
			
	}

	gulp.task('htmlprod', function(cb){
		html(cb, true)
	})

	gulp.task('html', html)



}