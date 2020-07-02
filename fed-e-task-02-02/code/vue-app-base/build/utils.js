const path = require('path')
const fs = require('fs')
const argv = require('yargs').argv
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cp = require('child_process');
const chalk = require('chalk') // 终端字符串样式
const semver = require('semver') // npm的语义版本 semver.valid('1.2.3') // '1.2.3'
const packageConfig = require('../package.json') //
const shell = require('shelljs') // nodejs 的shell 命令模块

/**
 * 执行检测版本命令
 * @param {*} cmd
 */
function execCheckVersion(cmd) {
    return cp.execSync(cmd).toString().trim()
}

const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version), // semver.clean('  =v1.2.3   ') // '1.2.3'
        versionRequirement: packageConfig.engines.node // 要求版本
    }
]

// 检查有没有这个命令，或者检查有没有安装npm
if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: execCheckVersion('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}
/**
 * @description 检查版本
 */
exports.checkVersion = function () {
    const warnings = []

    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]
        // semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }

    if (warnings.length) {
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
        }
        process.exit(1)
    }
}


/**
 * @description 获取CSS loader
 */
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    /**
     * @description generate loader string to be used with extract text plugin
     * @param {*} loader
     * @param {*} loaderOptions
     */
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            loaders.unshift(MiniCssExtractPlugin.loader);
            return loaders;
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }
    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.assetsPath = function (config, _path) {
    const assetsSubDirectory = argv.mode === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}
/**
 * 获取入口模块文件夹路径
 * @param  {String} root 路径
 */
const readEntryPath = (root) => {
    const modpath = path.resolve(root).replace(/\\/g, '/');
    let files = fs.readdirSync(modpath);
    let out = [];

    files.forEach((file) => {
        let stat = fs.statSync(modpath + '/' + file);
        if (stat.isDirectory()) {
            let path = root.replace(/\\/g, '/').replace(/\/$/, '/') + '/' + file;
            if (/^[A-Z]/.test(file)) { // 模块
                out.push(path);
            } else if (/^[a-z]/.test(file)) {
                out = out.concat(readEntryPath(path));
            }
        }
    })

    return out;
}

/**
 *
 * @param {string} dirname 监听文件路径
 */
exports.watchDirs = function (dirname) {
    let stat = fs.statSync(dirname)
    if (stat.isFile()) {
        fs.watch(path.resolve(dirname), function (event, filename) {
            let startIndex = dirname.indexOf('modules')
            let endIndex = dirname.indexOf('page')
            console.log(filename, dirname, startIndex, endIndex, dirname.substring(startIndex + 8, endIndex - 1))
        })
    } else {
        let subDirs = fs.readdirSync(dirname)
        subDirs.forEach(subDir => {
            let newPath = path.join(dirname, subDir)
            watchDirs(newPath)
        })
    }
}



const readdirfiles = (dir) => {
    const path = process.cwd();
    let root = path + '/' + dir;
    let files = fs.readdirSync(root);
    let out = [];
    for (let i = 0; i < files.length; i++) {
        let file = root + '/' + files[i];
        let stat = fs.lstatSync(file);
        if (stat.isDirectory(file)) {
            out = [].concat(
                out,
                readdirfiles(dir + '/' + files[i])
            );
        } else {
            out.push(dir + '/' + files[i]);
        }
    }
    return out;
}

exports.getFiles = function () {
    let files = readdirfiles('htdocs');
    fs.writeFileSync('publish.txt', files.join('\n'));
}

const vui = path.resolve(process.cwd(), '../web_vui_oa');
/**
 *
 * @param {String} path 判断文件是否存在
 */
function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

exports.updateVUI = function (cb) {
    // 文件夹存在，并且git存在
    if (fsExistsSync(vui) && fsExistsSync(vui.replace(/\/$/, '') + '/.git')) {
        console.log('正在将vui工程切换到 mason_vui分支，并进行更新...');
        cp.exec(`cd ${vui} && git checkout mason_vui && git pull`, function (err, result) {
            console.log('vui工程已更新');
            cb();
        })
    } else {
        console.log('未发现vui工程或者git未初始化');
        cb();
    }
}
/**
 * @description 获取web_vui_oa项目路径
 */
function findVUIPath(dirPath, projectName, directoryName) {
    let parentPath = path.resolve(dirPath, '..')
    let dirs = fs.readdirSync(parentPath)
    let result
    dirs.forEach(dir => {
        if (dir === projectName) {
            result = path.join(parentPath, dir)
            return
        }
    })
    if (!result) {
        findVUIPath(parentPath)
    } else {
        return path.join(result, directoryName)
    }
}
exports.findVUIPath = findVUIPath
