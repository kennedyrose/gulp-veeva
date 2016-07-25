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



	gulp.task('undist', function(){
		return del([config.dist])
	})
	gulp.task('mkdist', ['html', 'style', 'script', 'img'])

	gulp.task('dist', function(cb){
		return runSequence(
			['undist'],
			['mkdist'],
			cb
		)
	})






}