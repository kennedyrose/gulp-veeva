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


	function getDirectories(srcpath) {
		return fs.readdirSync(srcpath).filter(function(file) {
			return fs.statSync(path.join(srcpath, file)).isDirectory()
		})
	}



	gulp.task('scriptshared', function(){
		var dirs = getDirectories(config.src)
		for(var i = dirs.length; i--;){
			dirs[i] = config.dist + '/' + config.veeva.id + dirs[i].split('/').pop()
		}
		return gulp.src(mainBowerFiles())
			.pipe(plumber(onError))
			.pipe(filter('**/*.js'))
			.pipe(addSrc.prepend(config.src + '/veeva-library-4.0.js'))
			.pipe(addSrc.append(config.src + '/shared.js'))
			//.pipe(concat('shared.js'))
			.pipe(multiDest(dirs))
			.pipe(notify("JavaScript processed"))
	})
	gulp.task('scriptunique', function(){
		return gulp.src([
				config.src + '/**/script.js',
			])
			.pipe(plumber(onError))
			.pipe(rename(function(path){
				path.dirname = config.veeva.id + path.dirname
			}))
			.pipe(gulp.dest(config.dist))
	})
	gulp.task('script', function(){
		return runSequence('scriptunique', ['scriptshared'])
	})





}