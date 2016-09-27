"use strict";

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let injector = require('gulp-inject');
let livereload = require('gulp-livereload');
let browserSync = require('browser-sync').create();

let connect = require('connect');
let serve = require('serve-static');

let jsFiles = ['*.js', '/**/*.js'];

gulp.task('inject', () => {
	
	let wiredep = require('wiredep').stream;
	
	let options = {
		bowerJson: require('./bower.json'),
		directory: 'app/lib',
	};
	
	let injectSrc = gulp.src(['app/css/*.css', 'app/js/*.js'], {
		read: false
	});
	
	return gulp.src('app/*.html').
		pipe(wiredep(options)).
		pipe(injector(injectSrc)).
		pipe(gulp.dest('app'));
});

// gulp.task('server', () => {
// 	return connect().use(serve(__dirname)).
// 		listen(8080).
// 		on('listening', () => {
// 			console.log('Server running on Port 8080');
// 	})
// });

gulp.task('js-watch', ['inject'], () => {
	browserSync.reload();
});

gulp.task('css-watch', ['inject'], () => {
	browserSync.reload();
});

gulp.task('html-watch', () => {
	browserSync.reload();
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});
	
	gulp.watch(['!app/lib', 'app/**/*.js'], ['js-watch']);
	gulp.watch(['!app/lib', 'app/**/*.css'], ['css-watch']);
	gulp.watch(['!app/lib','app/**/*.html'], ['html-watch']);
});

gulp.task('default', ['serve']);