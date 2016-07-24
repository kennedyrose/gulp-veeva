// Preprocesses Sass for development and production
'use strict'
module.exports = function(gulp, config, plugins){

	var onError = {
		errorHandler: function(err) {
			util.log(util.colors.red(err))
			this.emit('end')
			gulp.src('')
				.pipe(notify('ERROR!!!'))
			
		}
	}



	function style(cb, prod){
		gulp.src(mainBowerFiles())
			.pipe(plumber(onError))
			.pipe(filter('**/*.{scss,css}'))
			.pipe(addSrc.append(config.src + '/' + config.style + '/**/*.scss'))
			.pipe(gulpif(!prod, sourcemaps.init()))
			.pipe(concat(config.style + '.css'))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(gulpif(prod, csso()))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.dist))
			// Inject into browser
			.pipe(plugins.browserSync.stream())
			.on('end', cb)
			.pipe(notify("Sass processed for " + (prod ? 'production' : 'development')))
	}

	gulp.task('styleprod', function(cb){
		style(cb, true)
	})

	gulp.task('style', style)


	return style

}