const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	// webpack基本配置文件入口出口指定
	entry: path.join(__dirname,'./src/mian.js'),
	
	output: {
		path:path.join(__dirname,'./dist'),
		filename:'bundle.js'
	},
	// devServer:{
	// 	contentBase: "./dist", // 本地服务器所加载文件的目录
	// 	port: "8088",  // 设置端口号为8088
	// 	inline: true, // 文件修改后实时刷新
	// 	historyApiFallback: true, //不跳转       
	// },
	module:{
		rules:[
			{
			    test: /\.css$/,
			    loader: ExtractTextPlugin.extract({
			        fallback: 'style-loader', 
			        use: ['css-loader']
			    })
			},
			{
			    test: /\.less$/,
			    loader: ExtractTextPlugin.extract({
			        fallback: 'style-loader', 
			        use: ['css-loader', 'less-loader']
			    })
			},
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
			{ test: /\.(jpg|png|gif|bmp|jpeg)$/, use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,// 限制只有小于1kb的图片才转为base64，例子图片为1.47kb,所以不会被转化
							esModule: false
						}
                    }
                ] }, // 处理 图片路径的 loader
			// limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
			{ test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
			{ test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
		]
		
	},
	plugins:[
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin() ,
		new ExtractTextPlugin("styles.css"),// 热更新插件
		require('autoprefixer'),// 引用autoprefixer模块,自动加载浏览器前缀.
		new VueLoaderPlugin()
	],
	resolve:{
		alias:{
			// 修改vue被导入包的位置
			"vue$": "vue/dist/vue.js"
		}
		}
}