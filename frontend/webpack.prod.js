const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	output:
		{
			filename: '[name].[contenthash].js',
		},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{loader: "html-loader", options: {minimize: true}}]
			},

		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
		new MinifyPlugin()
	],
	optimization:
		{
			minimizer: [new OptimizeCSSAssetsPlugin({})]
		}
});