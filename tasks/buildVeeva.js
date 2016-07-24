// Build/unbuild to dist
'use strict'
module.exports = function(gulp, config, plugins){




	// HELPERS
	var onError = {
		errorHandler: function(err) {
			util.log(util.colors.red(err))
			this.emit('end')
			gulp.src('')
				.pipe(notify('ERROR!!!'))
			
		}
	}

	function getDirectories(srcpath) {
		return fs.readdirSync(srcpath).filter(function(file) {
			return fs.statSync(path.join(srcpath, file)).isDirectory()
		})
	}







	// HTML
	var regLink1 = /href='\.\/(.*?)'/g,
		regLink2 = /href="\.\/(.*?)"/g
	gulp.task('veevahtml', function(cb){
		gulp.src([
				config.src + '/**/*.pug',
				'!' + config.src + '/**/_*.pug',
			])
			.pipe(plumber(onError))
			.pipe(pug({pretty:true}))
			.pipe(rename(function(path){
				console.log(path)
				path.basename = config.veeva.id + path.dirname
				path.dirname = config.veeva.id + path.dirname
				console.log(path)
			}))

			.pipe(replace(regLink1, 'href="veeva:gotoSlide(' + config.veeva.id + '$1.zip)"'))
			.pipe(replace(regLink2, 'href="veeva:gotoSlide(' + config.veeva.id + '$1.zip)"'))
			.pipe(gulp.dest(config.dist))
			.on('end', cb)
			.pipe(notify("Pug processed"))
	})


	


	// SCRIPT
	gulp.task('veevascriptshared', function(){
		var dirs = getDirectories(config.dist)
		for(var i = dirs.length; i--;){
			dirs[i] = config.dist + '/' + dirs[i]
		}
		return gulp.src(mainBowerFiles())
			.pipe(plumber(onError))
			.pipe(filter('**/*.js'))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(addSrc.prepend(config.src + '/veeva-library-4.0.js'))
			.pipe(addSrc.append(config.src + '/shared.js'))
			.pipe(concat('shared.js'))
			.pipe(multiDest(dirs))
			.pipe(notify("JavaScript processed"))
	})
	gulp.task('veevascriptunique', function(){
		return gulp.src([
				config.src + '/**/script.js',
			])
			.pipe(plumber(onError))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(rename(function(path){
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
	})
	gulp.task('veevascript', function(){
		return runSequence('veevascriptunique', ['veevascriptshared'])
	})












	// STYLE
	gulp.task('veevastyleshared', function(){
		var dirs = getDirectories(config.dist)
		for(var i = dirs.length; i--;){
			dirs[i] = config.dist + '/' + dirs[i]
		}
		return gulp.src(mainBowerFiles())
			.pipe(plumber(onError))
			.pipe(filter('**/*.{css,scss}'))
			.pipe(addSrc.append(config.src + '/shared.scss'))
			.pipe(sass())
			.pipe(rename(function(obj){
				console.log(obj)
			}))
			.pipe(concat('shared.css'))
			.pipe(multiDest(dirs))
			.pipe(plugins.browserSync.stream())
			.pipe(notify("CSS processed"))
	})
	gulp.task('veevastyleunique', function(){
		return gulp.src([
				config.src + '/**/style.scss',
			])
			.pipe(plumber(onError))
			.pipe(sass())
			.pipe(rename(function(path){
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
			.pipe(plugins.browserSync.stream())
	})
	gulp.task('veevastyle', function(){
		return runSequence('veevastyleunique', ['veevastyleshared'])
	})











	// IMAGES
	gulp.task('veevabg', function(cb){
		// Automatically create background and thumbnail
		gulp.src(config.src + '/**/*.psd')
			.pipe(cached('veevabg'))
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
	gulp.task('veevaslide', function(cb){
		gulp.src(config.src + '/**/*.psd')
			.pipe(cached('veevaslide'))
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
	gulp.task('veevatn', function(cb){
		// Automatically create background and thumbnail
		gulp.src(config.src + '/**/*.psd')
			.pipe(cached('veevatn'))
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
	gulp.task('veevaotherimg', function(cb){
		gulp.src(config.src + '/**/*.{svg,png,jpg,gif}')
			.pipe(cached('veevaotherimg'))
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
	gulp.task('veevaimg', ['veevabg', 'veevatn', 'veevaotherimg', 'veevaslide'])





	// ZIP
	gulp.task('cleanzip', function(){
		return gulp.src('build')
			.pipe(vinylPaths(del))
	})
	gulp.task('buildzip', function(){
		// Zip each individual subdirectory in dist and place everything in build
		var dirs = getDirectories(config.dist),
			arr = []

		dirs.forEach(function(value, key){
			arr[key] = gulp.src(config.dist + '/' + value + '/**/*')
				.pipe(zip(value + '.zip'))
				.pipe(gulp.dest('build'))
		})

		return merge(arr)

	})
	gulp.task('zip', function(){
		return runSequence('rebuild', 'cleanzip', 'buildzip')
	})







	// BUILD
	gulp.task('build', function(cb){
		runSequence('veevahtml', 'veevascript', 'veevastyle', 'veevaimg', cb)
	})

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





}