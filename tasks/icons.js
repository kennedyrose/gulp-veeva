// Processes icon file and creates Pug template
'use strict'
module.exports = function(gulp, config, plugins){


	gulp.task('buildicons', function(cb){

		var regSpace = / +?/g

		var files = gulp.src(config.src + '/' + config.icons + '/icon.*')
			.pipe(favicons({
				background: '#ffffff',
				path: config.icons + '/',
				logging: false,
				online: false,
				html: "_icons.html",
				pipeHTML: true,
				replace: true,
				icons: {
					android: true,
					appleIcon: true,
					coast: false,
					favicons: true,
					windows: true,

					appleStartup: false,
					firefox: false,
					opengraph: false,
					twitter: false,
					yandex: false,
				}
			}))
			.on("error", console.log)
			.pipe(filter(['*', '!manifest.json']))

		// Output icons
		var icons = files.pipe(filter(['*', '!_icons.html']))
			.pipe(gulp.dest(config.dist + '/' + config.icons))

		// Turn HTML into pug template
		var template = files.pipe(filter(['_icons.html']))
			.pipe(html2pug())
			.pipe(replace(/ +?/g, ''))
			.pipe(replace(/\n(.*)application-name(.*)\n/, '\n'))
			.pipe(replace(/\n(.*)apple-mobile-web-app-title(.*)\n/, '\n'))
			.pipe(replace(/\n(.*)manifest(.*)\n/, '\n'))
			.pipe(replace(/\n(.*)mobile-web-app-capable(.*)\n/g, '\n'))
			.pipe(replace(/\n(.*)theme-color(.*)\n/g, '\n'))
			.pipe(replace(/\nhtml\n/, '\n'))
			.pipe(replace(/\nhead\n/, '\n'))
			.pipe(replace(/\nbody/, '\n'))
			.pipe(gulp.dest(config.src + '/' + config.icons))

		merge(icons, template)
			.on('end', cb)


	})
	gulp.task('notifyicons', function(){
		return gulp.src('')
			.pipe(notify('Icons processed'))
	})

	gulp.task('icons', function(cb){
		plugins.runSequence('buildicons', 'notifyicons', cb)
	})


}