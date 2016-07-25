// Builds to build dir
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


	function getDirectories(srcpath) {
		return fs.readdirSync(srcpath).filter(function(file) {
			return fs.statSync(path.join(srcpath, file)).isDirectory()
		})
	}


	// Delete build dir
	gulp.task('clean-build', function(){
		return del([config.build])
	})

	// Copy dist files to build
	gulp.task('copy-dist', function(){
		return gulp.src([
				config.dist + '/**/*',
				'!' + config.dist + '/**/*.html'
			])
			.pipe(plumber(onError))
			.pipe(gulp.dest(config.build))
	})

	// Process HTML files
	var regLink1 = /href='\.\/(.*?)'/g,
		regLink2 = /href="\.\/(.*?)"/g
	gulp.task('process-html', function(cb){
		gulp.src(config.dist + '/**/*.html')
			.pipe(plumber(onError))
			.pipe(replace(regLink1, 'href="veeva:gotoSlide(' + config.veeva.id + '$1.zip)"'))
			.pipe(replace(regLink2, 'href="veeva:gotoSlide(' + config.veeva.id + '$1.zip)"'))
			.pipe(gulp.dest(config.build))
			.on('end', cb)
	})




	// Make build files
	gulp.task('mkbuild', function(cb){
		var dir = __dirname.split('/')
		dir.pop()
		dir = dir.join('/')
		var dirs = getDirectories(config.build),
			str = []
		for(var i = dirs.length; i--;){
			str.push('zip -r ' + dir + '/' + config.build + '/' + dirs[i] + '.zip ' + dirs[i])
			console.log(str)
		}
		return gulp.src('')
			.pipe(plumber(onError))
			.pipe(shell(str.join(' && '), {
				cwd: config.build
			}), {
				verbose: true,
			})
	})

	// Remove any non-build files
	gulp.task('tidy-build', function(){
		var dirs = getDirectories(config.build)
		for(var i = dirs.length; i--;){
			dirs[i] = config.build + '/' + dirs[i]
		}
		return del(dirs)
	})

	gulp.task('build', function(cb){
		runSequence(
			['clean-build'],
			['copy-dist'],
			['process-html'],
			['mkbuild'],
			['tidy-build'],
			cb
		)
	})



}