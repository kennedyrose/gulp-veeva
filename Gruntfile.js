module.exports = function(grunt) {'use strict'

	var config = require('./_config.js')

	// Project configuration.
	grunt.initConfig({
		responsive_videos: {

			all: {
				options: {
					encodes: [{
						mp4: [],
						webm: [],
					}],
					sizes: [{
						name: 'small',
						width: 320,
						poster: '00:00:01'
					},{
						name: 'large',
						width: 720,
						poster: '00:00:01'
					}]
				},
				files: [{
					expand: true,
					src: ['**.{mov,mp4}'],
					cwd: config.src + '/vid',
					dest: config.dist + '/vid'
				}]
			}

		}

	})

	 grunt.loadNpmTasks('grunt-responsive-videos')

}
