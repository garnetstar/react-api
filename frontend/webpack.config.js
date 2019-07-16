const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists



module.exports = (env) => {

	const is_production = env.ENVIRONMENT === 'production';
	const currentPath = path.join(__dirname);
	const basePath = currentPath + '/.env';
	const envPath = basePath + '.' + env.ENVIRONMENT;
	const finalPath = fs.existsSync(envPath) ? envPath : basePath;
	const fileEnv = dotenv.config({path: finalPath}).parsed;

	const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
		return prev;
	}, {});

	return {
		entry: "./src/index.js",
		output: {
			path: path.join(__dirname, "/build"),
			filename: is_production ? '[name].[hash].js' : '[name].js',
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
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
					loader: 'url-loader?limit=100000'
				},
				{
					test: /\.html$/,
					use: [{ loader: "html-loader", options: { minimize: false} }]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({template: "./src/index.html",filename: "./index.html"}),
			new webpack.DefinePlugin(envKeys)
		]
	};
};
