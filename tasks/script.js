// Preprocesses JS for development and production
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


	function script(cb, prod){

		// Create bower stream
		var bower = gulp.src(mainBowerFiles())
			.pipe(filter('**/*.js'))
			.pipe(gulpif(!prod, sourcemaps.init()))
			.pipe(concat('bower.js'))

		// Create src stream
		var src = gulp.src([
				config.src + '/' + config.script + '/**/!(init)*.js',
				config.src + '/' + config.script + '/**/init.js',
			])
			.pipe(plumber(onError))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(gulpif(!prod, sourcemaps.init()))
			.pipe(concat('src.js'))
			.pipe(wrapJs("!function(w,d,u){'use strict';%= body %}(window,document)"))

		// Merge bower and script
		var all = merge(bower, src)
			.pipe(order([
				'bower.js',
				'src.js',
			]))
			.pipe(concat('all.js'))

		// Create polyfill stream
		var polyfills = all
			.pipe(autopolyfiller('polyfills.js'), {
				browsers: config.browsers
			})
			.pipe(gulpif(!prod, sourcemaps.init()))

		// Merge all
		merge(all, polyfills)
			.pipe(order([
				'polyfills.js',
				'all.js',
			]))
			.pipe(concat(config.script + '.js'))
			.pipe(gulpif(!prod, sourcemaps.write()))

			// If production, strip debug and uglify
			.pipe(gulpif(prod, stripDebug()))
			.pipe(gulpif(prod, uglify({preserveComments:'some'})))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify("JavaScript processed for " + (prod ? 'production' : 'development')))
	}

	gulp.task('scriptprod', function(cb){
		script(cb, true)
	})

	gulp.task('script', script)



}