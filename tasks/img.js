// Preprocesses images
'use strict'
module.exports = function(gulp, config, plugins){

	// Preprocess images
	var imgConfig
	var imgConfigArr = []
	// Create image tasks
	gulp.task('createimageprocess', function(cb){

		imgConfig = require('../' + config.src + '/' + config.img + '/_config.js')

		imgConfig.forEach(function(imgData, i){

			imgData.imageMagick = true
			gulp.task('imgprocess' + i, function(cb){
				gulp.src(imgData.src)
					.pipe(cached('imgMagick'))
					.pipe(plugins.imageResize(imgData))
					.pipe(imagemin())
					.pipe(gulp.dest(config.dist + '/' + config.img))
					.on('end', cb)
			})
			imgConfigArr.push('imgprocess' + i)
		})
		gulp.task('imgprocessall', imgConfigArr)
		cb()
	})
	gulp.task('imgprocessall', function(cb){cb()})
	gulp.task('imgcopy', function(cb){

		// Build noProcess array of globs with imgConfig globs prepended with !
		var noProcess = [
			config.src + '/' + config.img + '/**/*.{svg,png,jpg,gif}',
			'!' + config.src + '/' + config.img + '/sprite*/*',
		]
		for(var i = imgConfig.length; i--;){
			noProcess.push('!' + imgConfig[i].src)
		}


		// Copy to img dir
		gulp.src(noProcess)
			.pipe(cached('img'))
			.pipe(imagemin())
			.pipe(gulp.dest(config.dist + '/' + config.img))
			.on('end', cb)

	})
	gulp.task('notifyimg', function(){
		return gulp.src('')
			.pipe(notify('Images processed & compressed'))
	})


	gulp.task('img', function(cb){
		plugins.runSequence(
			'createimageprocess',
			['imgcopy', 'imgprocessall'],
			'notifyimg',
			cb
		)
	})



}