# webpack 打包环境踩坑之旅

## 基础包的安装

## 拓展包的安装

## 未整理内容

创建 github 仓储 

生成密钥  配置密钥

本地 初始化vue 项目 
node init 初始化项目 得到package.js 
下载相关 依赖包 部署到全局或者是 开发环境中 
https://www.cnblogs.com/BetterMan-/p/9867642.html
逻辑·顺序  当我们实际开发最基础的需求就是 webpack安装就能正常运行 然后一步步兼容基础需求
1 webpack 4.x之后需要安装webpack-cli 依赖才能 并且在Windows上可能需要修改权限 不然会报错 
PS C:\Users\Administrator\Desktop\test> get-ExecutionPolicy
Restricted
PS C:\Users\Administrator\Desktop\test> set-ExecutionPolicy RemoteSigned

2 配置 最基础的webpack.config.js中的入口和出口 ，虽然4.x中好像不要设置 但是需要有这个习惯 然后安装
webpack-dev-server 在本地服务器跑起来 配置好package.js 中的 script脚本和congig.js 中的devServer
const path = require('path');
module.exports = {
    entry: path.join(__dirname, "/src/index.js"), // 入口文件
    output: {
        path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./dist", // 本地服务器所加载文件的目录
        port: "8088",   // 设置端口号为8088
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true, //不跳转
    }
}
3 这个时候我们需要考虑 js最基本的打包可以完成了 接下来就是处理 css  css还可以由less和scss转化而来 
这个时候我们需要安装 一些loader 来转化 并在config.js中配置一个module{}来设置相应的匹配规则。
css： style-loader css-loader  postcss-loader？？安装时出错记得清除npm缓存
 npm cache clean --force 尤其是在下次打开老项目的时候 或者删除整个node-modules 在 安装环境
当下载速度太慢就修改源或者使用cnpm
sass sass 依赖于 node-sass 需要同时安装 sass-loader 还依赖一个 fibers
npm install -g cnpm --registry=https://registry.npm.taobao.org

module{
	rules:[
		test:"",
		use:[, , ,] 这里use有两种写法 一种是数组或直接写（一个）或者是数组对象 一个对象写一个
			{loader：‘’}，{ }
	]
}
css
less
scss

extract-text-webpack-plugin 作用、安装、使用  有坑 、需要更新版本
　　作用：该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
	这里可以联想到 处理图片时候 也会有坑 


4 解决css 之后我们需要 考虑 css中 图片和 路径不能识别的问题 需要安装两个 loader
file-loder url-loader  图片 和图标路径都需要url-loader来处理 出现问题参考
 webpack.common.js
...
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,   // 正则匹配以.css结尾的文件
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'],
                    publicPath: '../'  // 给背景图片设置一个公共路径
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,  // 限制只有小于1kb的图片才转为base64，例子图片为1.47kb,所以不会被转化
                         
                        }
                    }
                ]
            },
            ...
        ]
    },


5 最基本的 需求解决了 就往高级需求发展  在 js中我们 有时候需要写es6的代码 所以我们要安装babel 和其插件
 Babel- core bable-loader bable-plugin-transform-runtime
 bable-preset-env bable-preset-stage-0 (最强大的级别)

根据模块化的需求配置 .babelrc文件 和config.js同级 必须符合json格式
{
	“preset”：['evn','stage-0'],
	"pluging": ["transform-runtime"]
}

然后再 config 里面配置相应的js 匹配规则 并去除node_modules 里面的 不然严重影响性能。excude：/node_modules/

6 这时候大部分需求都能满足了  我们可以考虑自动打包 也就是热处理 使得代码改变时效果同时改变，
  这个时候需要再 config中配置pulging{
} 在 需要相应插件的时候 安装 导入模块 并在其中创建 新的对象实例

项目拓展 根据需求安装 loader 或者是插件 例如vue-loader  
最后 关于项目 结构优化 看需求走 安装对应插件和loder 或者 灵活运用webpack本身提供的插件等。
https://www.cnblogs.com/BetterMan-/p/9867642.html

压缩代码
在webpack4.x版本中当你打包时会自动把js压缩了，而且npm run dev运行服务器时，当你修改代码时，热更新很慢，这是因为你修改后webpack又自动为你打包，这就导致了在开发环境中效率很慢，所以我们需要把开发环境和生产环境区分开来，这时就体现出我们代码分离的便捷性了，webpack.dev.js代表开发环境的配置，webpack.prod.js代表生产环境的配置，这时我们只要在package.json文件中配置对应环境的命令即可：

{
  ...
  "scripts": {
    "build": "webpack --config webpack.prod.js --mode production",
    "dev": "webpack-dev-server --open --config webpack.dev.js --mode development"
  },
  ...
  }
}

调试webpack 打包环境下出现的问题 以及解决方案
Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
如题报错是因为webpack用了4以上版本 ，而extract-text-webpack-plugin过低造成的。解决办法升级extract-text-webpack-plugin或降级webpack。

升级extract-text-webpack-plugin：

npm install extract-text-webpack-plugin@next --save-dev


babel-loader和babel-core版本不对应所产生的，

babel-loader 8.x对应babel-core 7.x
babel-loader 7.x对应babel-core 6.x

{
			    test: /\.css$/,
			 -》   loader: ExtractTextPlugin.extract({
			        fallback: 'style-loader', 
			        use: ['css-loader']
			    })
			},


. 参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
. Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
. 在webpack.config.js中加入
1
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    devtool: "sourcemap",
    entry: './js/entry.js', // 入口文件
    output: {
        filename: 'bundle.js' // 打包出来的wenjian
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module : {
    ...
}
}

检查 file-loader 的版本
当 file-loader 的版本是 4.3.0 及以上，则需要在 webpack.config.js 中手动配置属性 esModule :

      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        loader: "file-loader",
        options: {
          esModule: false, // 默认值是 true，需要手动改成 false
          name: "images/[hash].[ext]"
        }
      }


 less 以及sass  的打包问题

ass-loader@* requires a peer of sass@^1.3.0   sass-loder还依赖这个包
当报环境错误的时候重装node-sass 这个包 
Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 10.x

解决npm rebuild node-sass

正式开发


提交到本地仓储 

提交到github

拉取github 重复操作