// Preprocesses images
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


	gulp.task('bg', function(cb){
		// Automatically create background and thumbnail
		gulp.src(config.src + '/**/*.psd')
			.pipe(cached('bg'))
			.pipe(plumber(onError))
			.pipe(imageResize({
				format: 'jpg',
				width: 2048,
				height: 1536,
				crop: false,
				upscale: false,
				imageMagick: true
			}))
			.pipe(imagemin())
			.pipe(rename(function(path){
				path.basename = config.veeva.id + path.dirname + '-full'
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify('Background images processed'))

	})
	gulp.task('slide', function(cb){
		gulp.src(config.src + '/**/*.psd')
			.pipe(cached('slide'))
			.pipe(plumber(onError))
			.pipe(imageResize({
				format: 'jpg',
				width: 2048,
				height: 1536,
				crop: false,
				upscale: false,
				imageMagick: true
			}))
			.pipe(imagemin())
			.pipe(rename(function(path){
				path.basename = 'bg'
				path.dirname = config.veeva.id + path.dirname + '/img'
			}))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify('Background images processed'))
	})
	gulp.task('tn', function(cb){
		// Automatically create background and thumbnail
		gulp.src(config.src + '/**/*.psd')
			.pipe(cached('tn'))
			.pipe(plumber(onError))
			.pipe(imageResize({
				format: 'jpg',
				width: 200,
				height: 150,
				crop: false,
				upscale: false,
				imageMagick: true
			}))
			.pipe(imagemin())
			.pipe(rename(function(path){
				path.basename = config.veeva.id + path.dirname + '-thumb'
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify('Thumbnails images processed'))

	})
	gulp.task('otherimg', function(cb){
		gulp.src(config.src + '/**/*.{svg,png,jpg,gif}')
			.pipe(cached('otherimg'))
			.pipe(plumber(onError))
			.pipe(imagemin())
			.pipe(rename(function(path){
				console.log(path)
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify('Images processed'))
	})
	gulp.task('img', ['bg', 'tn', 'otherimg', 'slide'])


}