// Preprocesses images
'use strict'
module.exports = function(gulp, config, plugins){


	gulp.task('manifest', function(){
		gulp.src([
				config.dist + '/**/*',
				'!' + config.dist + '/app.manifest'
			])
			.pipe(manifest({
				timestamp: true
			}))
			.pipe(replace('\nNETWORK:', fs.readFileSync(config.src + '/app.manifest', 'utf8') + '\n\nNETWORK:'))
			.pipe(gulp.dest(config.dist))
	})


}