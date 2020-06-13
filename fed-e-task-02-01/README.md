## 简答题
### 第一题 谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

* 前端应用功能要求不断提高,业务逻辑日益复杂
* 从传统的网站,到h5,小程序,桌面应用,跨多端应用,后台开发,前端应用覆盖广泛
* 行业对前端开发者的要求发生了天翻地覆的变化
可以解决如下问题
* 想要使用ES6+的新特性,但是浏览不支持
* 想使用Less/Sass/PostCSS增强CSS的编程型,但是运行环境不支持
* 想要使用模块化的方式提高项目的可维护性
* 部署上线前需要手动压缩代码及资源文件
* 部署过程需要手动上传代码到服务器
* 多人协作开发,无法硬性统一代付风格
* 部分功能开发需要等待后端服务接口提前完成

最终是为了提高开发效率,减轻企业的负担

### 第二题 你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
* 创建项目基础结构,提供项目规范和约定
* 相同的组织结构
* 相同的开发范式
* 相同的模块依赖
* 相同的工具配置
* 相同的基础代码
* 根据脚手架创建的项目骨架进行后续的开发



## 编程题

### 练习1
题解:
这个是cli.js文件,详情请看code/code_1
```javascript
#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件
const inquirer  = require('inquirer')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?',
        default: 'demo'
    }
]).then(answers => {
  // 根据用户回答的结果生成文件

  // 模板目录
  const tempDir = path.join(__dirname,'templates')
  const destDir = process.cwd()
  // 将模板下的文件全部转换到目标目录
  fs.readFile(tempDir, (err,files) => {
      if(err) return
      files.forEach(file  => {
          // 通过模板引擎渲染文件
          ejs.renderFile(path.join(tempDir,file),answers,(err,result) => {
              if(err) return
              // 将结果写入目标文件路径
              fs.writeFileSync(path.join(destDir,file),result)
          })
      })
  })
})
```
### 练习2
这个gruntfile.js文件,详情请看code/code_2
题解:
```javascript
const loadGruntTasks = require("load-grunt-tasks");
const sass = require("node-sass");
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

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: [
          {
            "dist/assets/styles/main.css": "src/assets/styles/main.scss",
          },
        ],
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      dist: {
        files: {
          "dist/assets/scripts/main.js": "src/assets/scripts/main.js",
        },
      },
    },
    uglify: {
      options: {
        //不是必须的
        banner:
          "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      build: {
        files: {
          "dist/assets/scripts/main.min.js": ["dist/assets/scripts/main.js"],
        },
      },
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      build: {
        files: {
          "dist/assets/styles/main.min.css": ["dist/assets/styles/main.css"],
        },
      },
    },
    clean: {
      dist: "dist/**", // 可以使用通配符* / **
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3, //定义 PNG 图片优化水平
        },
        files: [
          {
            expand: true,
            cwd: "src/assets/images/", // 图片在imagemin目录下
            src: ["**/*.{png,jpg,jpeg}"], // 优化 imagemin 目录下所有 png/jpg/jpeg 图片
            dest: "dist/assets/images", // 优化后的图片保存位置，覆盖旧图片，并且不作提示
          },
        ],
      },
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ["src/assets/fonts/"],
            dest: "dist/assets/fonts/",
            filter: "isFile",
          },
          // flattens results to a single level
          {
            expand: true,
            flatten: true,
            src: ["node_modules/bootstrap/dist/css/bootstrap.css"],
            dest: "dist/assets/styles/",
            filter: "isFile",
          },
          {
            expand: true,
            flatten: true,
            src: ["node_modules/jquery/dist/jquery.js"],
            dest: "dist/assets/scripts/",
            filter: "isFile",
          },
          {
            expand: true,
            flatten: true,
            src: ["node_modules/popper.js/dist/umd/popper.js"],
            dest: "dist/assets/scripts/",
            filter: "isFile",
          },
          {
            expand: true,
            flatten: true,
            src: ["node_modules/bootstrap/dist/js/bootstrap.js"],
            dest: "dist/assets/scripts/",
            filter: "isFile",
          },
        ],
      },
    },
    swigtemplates: {
      options: {
        defaultContext: data,
        templatesDir: "src",
      },
      production: {
        dest: "dist/",
        src: ["src/*.html"],
      },
    },
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
      },
      html: {
        files: [{ expand: true, cwd: "dist", src: ["*.html"], dest: "dist" }],
      },
    },
    useminPrepare: {
      html: ["dist/*.html"],
      options: {
        dest: "dist", // string type
      },
    },
    usemin: {
      html: ["dist/*.html"], // 注意此处是build/
      options: {
        assetsDirs: ["dist/assets/scripts/"],
      },
    },
    concat: {
      options: {
        //可选项配置
        separator: ";", //使用;连接合并
      },
      js: {
        //此名称任意
        src: [
          "dist/assets/scripts/bootstrap.js",
          "dist/assets/scripts/jquery.js",
          "dist/assets/scripts/popper.js",
        ], //合并哪些js文件
        dest: "dist/assets/scripts/vendor.js", //输出的js文件
      },
      css: {
        src: ["dist/assets/styles/bootstrap.css"],
        dest: "dist/assets/styles/vendor.css",
      },
    },
  });
  loadGruntTasks(grunt);
  grunt.registerTask("default", [
    // "clean",
    "sass",
    "cssmin",
    "babel",
    "uglify",
    "imagemin",
    "copy",
    "swigtemplates",
    "useminPrepare",
    "usemin",
    "concat",
    "htmlmin",
  ]);
  grunt.registerTask("clean", ["clean"]);
};

```
### 练习3
 这是gulpfile.js文件, 详情请看code/code_3
题解:
```javascript
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

```
