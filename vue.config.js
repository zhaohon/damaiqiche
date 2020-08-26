module.exports = {
    publicPath: './',
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

  