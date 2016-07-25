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


	function getDirectories(srcpath) {
		return fs.readdirSync(srcpath).filter(function(file) {
			return fs.statSync(path.join(srcpath, file)).isDirectory()
		})
	}



	gulp.task('styleshared', function(){
		var dirs = getDirectories(config.dist)
		for(var i = dirs.length; i--;){
			dirs[i] = config.dist + '/' + dirs[i]
		}
		return gulp.src(mainBowerFiles())
			.pipe(plumber(onError))
			.pipe(filter('**/*.{css,scss}'))
			.pipe(addSrc.append(config.src + '/shared.scss'))
			.pipe(sass())
			//.pipe(concat('shared.css')
			.pipe(multiDest(dirs))
			.pipe(plugins.browserSync.stream())
			.pipe(notify("CSS processed"))
	})
	gulp.task('styleunique', function(){
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
	gulp.task('style', function(){
		return runSequence('styleunique', ['styleshared'])
	})







}