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