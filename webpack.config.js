const webpack = require('webpack');
const baseConfig = require('@swup/webpack-config');

const config = Object.assign({}, baseConfig, {
	entry: {
		SwupTheme: './entry.js',
		'SwupTheme.min': './entry.js'
	},
	output: {
		path: __dirname + '/dist/',
		library: 'SwupTheme',
		libraryTarget: 'umd',
		filename: '[name].js'
	}
});

module.exports = config;
