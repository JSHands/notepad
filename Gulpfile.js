"use strict";

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let injector = require('gulp-inject');
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
	
	let injectOptions = {
		ignorePath: 'app/'
	};
	
	let injectSrc = gulp.src(['!app/lib/**', '!app/lib/', 'app/**/*.css', 'app/**/*.js'], {
		read: false
	});
	
	return gulp.src('app/*.html').
		pipe(wiredep(options)).
		pipe(injector(injectSrc, injectOptions)).
		pipe(gulp.dest('app'));
});

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

gulp.task('nodemon', (cb) => {
	let started = false;
	
	return nodemon({
		script: 'server.js'
	}).
		on('start', () => {
			if (!started) {
				cb();
				started = true;
			}
	});
});

gulp.task('default', ['inject', 'nodemon', 'serve']);