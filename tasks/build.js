// Build/unbuild to dist
'use strict'
module.exports = function(gulp, config, plugins){



	// Build tasks
	gulp.task('unbuild', function(){
		return gulp.src('dist')
			.pipe(vinylPaths(del))
	})
	gulp.task('rebuild', function(cb){
		runSequence(
			'unbuild',
			['build'],
			cb
		)
	})
	gulp.task('build', function(cb){
		// Clear cache
		cached.caches = {}

		// Build everything
		runSequence(
			['fonts', 'googlefonts', 'svg', 'icons'],
			['html', 'style', 'script', 'img', 'video'],
			['manifest'],
			cb
		)
	})
	gulp.task('buildprod', function(cb){
		runSequence(
			['fonts', 'googlefonts', 'svg', 'icons'],
			['htmlprod', 'styleprod', 'scriptprod', 'img', 'video'],
			['manifest'],
			cb
		)
	})





}