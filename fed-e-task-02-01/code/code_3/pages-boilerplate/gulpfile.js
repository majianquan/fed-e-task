const { src, dest, parallel, series, watch } = require("gulp");

const del = require("del");
const browserSync = require("browser-sync");

const loadPlugins = require("gulp-load-plugins");

const plugins = loadPlugins();
// 创建服务器
const bs = browserSync.create();

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce",
        },
        {
          name: "About",
          link: "https://weibo.com/zceme",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/zce",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};
const style = () => {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" })) // 编译之后括号展开
    .pipe(dest("temp"));
};
const script = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(
      plugins.babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("temp"));
};
const page = () => {
  return src("src/**/*.html", { base: "src" })
    .pipe(
      plugins.swig({
        data,
        cache: false,
      })
    ) // 指定数据
    .pipe(dest("temp"));
};
const image = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};
const font = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin()) // 这里的压缩是指字体文件中的svg
    .pipe(dest("dist"));
};
const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};
const clean = () => {
  return del(["dist", "temp"]);
};

const serve = () => {
  // 监听某些文件变化,然后执行某个编译任务
  watch("src/assets/styles/*.scss", style);
  watch("src/assets/scripts/*.js", script);
  watch("src/**/*.html", page);
  // watch('src/assets/images/**', image);
  // watch('src/assets/fonts/**', font);
  // watch('public/**', extra);
  // 优化
  // 只有这些静态资源变化之后,重新请求就可以了,不用运行任务
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  );

  bs.init({
    notify: false,
    port: 3000, //设置端口
    open: true,
    files: "dist/**",
    server: {
      // 网站根目录,静态资源优化
      // 静态资源只有在打包的时候才需要把它打包进dist
      // 开发阶段就让他放在原位置
      // 这时候的web服务器会依次按照数组的属性找资源文件
      baseDir: ["temp", "src", "public"], // 指定一个数组
      routes: {
        "/node_modules": "node_modules",
        // 如果/node_modules请求不到,就会请求根目录的node_modules
      },
    },
  });
};

//     "gulp-useref": "^3.1.6" 已经自动安装了
const useref = () => {
  return (
    src("temp/*.html", { base: "temp" })
      // 构建一个转换流,对刚刚的构建注释,做一个对应的转换
      // 对文件的合并首先要找到这些文件
      // 如果这些文件已经在dist了
      // 对已有些文件还在/node_modules,则设置 .
      // searchPath就是制定搜索路径的
      .pipe(plugins.useref({ searchPath: ["temp", "."] }))
      // 对引用的三方资源进行压缩打包
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(
        plugins.if(
          /\.html$/,
          // htmlmin之后压缩属性中的空白字符,其他换行和空格没有压缩,需要制定参数collapseWhitespace
          plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true, // 压缩行内样式
            minifyjs: true, // 压缩行内js
          })
        )
      )
      .pipe(dest("dist"))
  );
};

// 只是编译文件,不转移静态资源
const compile = parallel(style, script, page);
// 编译构建的时候先清空,然后在编译,转移静态资源
const build = series(
  clean,
  parallel(series(compile, useref), image, font, extra)
);
// 开发任务,先编译,然后在启动服务
const develop = series(compile, serve);
module.exports = {
  build, // 编译发布
  develop, // 开发环境
  clean, // 清除所有编译文件和临时目录
};
