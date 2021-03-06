const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	entry: "./src/index.js",
	output:
		{
			path: path.join(__dirname, "/build"),
			publicPath: '/'
		},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../',
							hmr: false,
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.sass$/,
				use: [
					// fallback to style-loader in development
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	}
	,
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: "./src/index.html",
				filename: "./index.html",
				title: 'Caching XXXXXXXXXXXXXX'
			}
		),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['**/*', '!\.htaccess', '!favicon.ico', '!manifest.json'],
		}),
		new webpack.DefinePlugin(envKeys)
	],
	optimization:
		{
			moduleIds: 'hashed',
			runtimeChunk:
				'single',
			splitChunks:
				{
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name:
								'vendors',
							chunks:
								'all'
						}
					}
				},
		}
}
