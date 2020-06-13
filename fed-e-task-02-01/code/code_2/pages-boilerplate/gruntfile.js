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
