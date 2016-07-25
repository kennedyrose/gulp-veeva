// Preprocesses Pug for development and production
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





	gulp.task('html', function(cb){

		gulp.src([
				config.src + '/**/*.pug',
				'!' + config.src + '/**/_*.pug',
			])
			.pipe(plumber(onError))
			.pipe(pug({pretty: '\t'}))
			.pipe(rename(function(path){
				path.basename = config.veeva.id + path.dirname
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify("Pug processed"))
			
	})



}