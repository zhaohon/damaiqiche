module.exports = {
  //基本路径
  // publicPath: "/h5/",
  publicPath: "./",
  //outputDir: "dist", 构建时输出目录 默认dist
  //放置静态资源目录
  assetsDir: "static",
  //indexPath: "index.html", html输出路径 默认 index.html
  // devServer: {
  //   port: 8012,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8443",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": ""
  //       }
  //     }
  //   }
  // },
  configureWebpack: (config) => {
    // 判断为生产模式下，因为开发模式我们是想保存console的
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress;
        option.drop_console = true; // 打开开关
        return arg;
      });
    }
  },
}

