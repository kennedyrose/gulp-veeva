// Uploads content to phonegap
'use strict'
module.exports = function(gulp, config, plugins){

	// Create Config.xml file
	gulp.task('prephonegap', function(){
		var obj = {
			tokens: JSON.parse(fs.readFileSync('./package.json'))
		}
		return gulp.src(config.src + '/Config.xml')
			.pipe(tokenReplace(obj))
			.pipe(gulp.dest(config.dist))
	})

	// Send dist to phonegap?
	

}