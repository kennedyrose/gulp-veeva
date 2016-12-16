// Preprocesses JavaScript with source maps
'use strict'
module.exports = function(gulp, config, plugins){
	gulp.task('ftp', function(){
		var conn = vinylFtp.create({
			host: config.ftp.host,
			port: config.ftp.port,
			user: config.ftp.user,
			password: config.ftp.password,
		})


		return gulp.src(config.dist + '/**/*')
			.pipe(conn.newerOrDifferentSize(config.ftp.path))
			.pipe(conn.dest(config.ftp.path))
			.pipe(notify("Deployed to FTP"))

	})
}