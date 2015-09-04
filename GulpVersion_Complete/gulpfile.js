var gulp = require('gulp');
var postcss = require('gulp-postcss');

var myplugin = require('postcss-myplugin');

gulp.task('css', function () {
	var processors = [
		myplugin({
			fontstacks: {
				// 'Extra Stack': '"Extra Stack", "Moar Fonts", Extra, serif',
				// 'Arial': 'Arial, "Comic Sans"'
			}
		})
	];
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'));
});