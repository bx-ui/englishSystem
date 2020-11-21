const path = require("path");
const port = 3000;
const title = "vue通用框架";

function resolve(dir) {
  return path.join(__dirname, dir);
}

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/styles/imports.scss")]
    });
}

module.exports = {
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
    // 修改当前项目默认svg配置，排除icons目录
    config.module.rule("svg").exclude.add(resolve("./src/icons"));

    // 新增一个rule：添加icons里的svg
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });

    // 设置alias
    config.resolve.alias.set("icons", resolve("./src/icons"));
  },
  configureWebpack: {
    name: title
  },
  // publicPath: "/best-practice",
  devServer: {
    port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      "/apis": {
        target: `http://localhost:8088`,
        changeOrigin: true,
        pathRewrite: {
          "^/apis": ""
        }
      }
    }
  }
};
