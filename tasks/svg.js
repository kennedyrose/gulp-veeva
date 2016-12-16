// Preprocesses images
'use strict'
module.exports = function(gulp, config, plugins){




	gulp.task('presvg', function(cb){

		// Build task for each svg sprite folder
		console.log('building tasks')
		// Find directories
		var dirs = glob.sync([
			config.src + '/' + config.img + '/sprite**',
			'!' + config.src + '/' + config.img + '/**/*.*',
		])

		var svgTasks = []
		dirs.forEach(function(dir, i){
			var name = dir.split('/').pop()

			gulp.task('svg' + i, function(cb){
				console.log(dir + '/*.svg')
				gulp.src(dir + '/*.svg')
					.pipe(svgSprite({
						mode: {
							symbol: {
								render: {
									scss: false,
									css: false
								},
								dest: config.dist,
								sprite: config.img + '/' + name + '.svg'
							}
						}
					}))
					/*
					// Change name of sass file
					.pipe(rename(function(path){
						if(path.extname === '.scss'){
							path.basename = '_' + name
							path.dirname = config.src + '/sass'
						}
					}))
					*/
					.pipe(gulp.dest('./'))
					.on('end', cb)
			})
			svgTasks.push('svg' + i)
		})

		gulp.task('buildsvg', svgTasks)

		cb()
	})

	gulp.task('buildsvg', function(cb){cb()})

	gulp.task('notifysvg', function(){
		return gulp.src('')
			.pipe(notify('SVG sprites processed & compressed'))
	})
	gulp.task('svg', function(cb){
		plugins.runSequence('presvg', 'buildsvg', 'notifysvg', cb)
	})




}