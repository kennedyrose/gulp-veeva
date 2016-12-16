# Veeva CLM Gulp Boilerplate


## Setup:
In correct directory in terminal:

- `git clone https://ken85rose@bitbucket.org/ken85rose/gulp-boilerplate.git`
- Change package.json file as needed
- `npm install`
- `bower install`
- Run `gulp init` if using repository
- `gulp config`


## Dependencies:
- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- [Node.js](https://nodejs.org/en/)
- Homebrew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- Imagemagick: `brew install imagemagick`
- Graphicsmagick: `brew install graphicsmagick`
- ffmpeg: `brew install ffmpeg --with-libvorbis --with-nonfree --with-gpl --with-libvpx --with-pthreads --with-libx264 --with-libfaac --with-theora --with-libogg`
- [Git](https://git-scm.com/download/mac)


## Usage:
- `gulp`: Starts live development server
- `gulp zip`: Builds and zips each slide into "build" directory


## To Do:
- make zip links prod only
- watchers
