const path = require('path');

const tsConfig = {
	mode: "development", //開発用 "production",//本番用
	entry: './src/ts/main.ts',
	output: {
		path: path.resolve(__dirname, "./dist/js"),
		filename: 'main.js', 
	},
  devServer: {
    static: "dist",
    open: true
  },
	module: {
		rules: [
			{
			test: /\.ts$/,
			use: 'ts-loader',
		}, 
	],
	},
	resolve: {
		extensions: [ 
			'.ts', '.js',
		],
	},
};


module.exports = [
	tsConfig
];