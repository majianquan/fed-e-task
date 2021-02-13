## 简答题



#### 1.简述 Node.js 的特点以及适用的场景。
异步io
单线程
事件驱动

应用场景:
  IO密集型高并发请求
  操作数据库提供api服务
  实时聊天应用程序

#### 2.简述 Buffer 的使用.包括多种创建方式。实例方法，静态方法。
Buffer 让javaScript可以操作二进制数据, 流操作
Nodejs平台下javaScript可以实现IO

创建
alloc: 创建指定字节大小的buffer
allocUnsafe: 创建指定大小的buffer(不安全)
from: 接收数据, 创建buffer

实例方法
fill: 使用数据填充buffer
write: 向buffer中写入数据
toString: 从buffer中提取数据
slice: 截取buffer
indexOf: 在buffer中查找数据
copy: 拷贝buffer中的数据

静态方法
concat: 将多个buffer拼接成一个新的buffer
isBuffer: 判断当前数据是否为buffer


#### 3.写出5个以上文件操作的API，并且用文字说明其功能。
readFile: 从指定文件中读取数据
writeFile:向指定文件中写入数据
appendFile: 追加的方式向指定文件中写入数据
copyFile: 将某个文件中的数据拷贝至另外的一个文件
watchFile: 对指定文件进行监控


#### 4.简述使用流操作的优势，以及Node中流的分类。

流操作的优势
时间效率： 流的分段处理可以同时操作多个数据chunk
空间效率： 同一个时间流无须占据大内存空间
使用方便：  流配合管理，扩展程序变简单

Node中流的分类

Readable: 可读流，能够实现数据的读取
Writeable： 可写流， 能够实现数据的写操作
Duplex: 双工流，既可以读，又可以写
Tranform: 转换流，可读可写， 还能实现数据转换


#### 5.在数据封装与解封装过程中，针对应用层、传输层、网络层、数据链路层、物理层5层分别做了什么事情？


应用层: 产出真正数据 
传输层: 控制数据传输可靠,协议有tpc/udp, 数据被包裹上目标端口和应用源端口
网络层: 确定目标网络,通过ip协议目标主机所在网络,数据被包裹上目标主机ip地址和源主机ip地址
数据链路层: 确定目标主机,通过mac地址寻址操作, 数据被包裹上, 目标主机的mac地址和源主机的mac地址
物理层: 各种物理设备和标准, 网线不能识别二进制, 通过网卡调制之后变成高低电压 

应用层: 拆出真正数据 
传输层: 分析当前的目标端口是否是这个应用
网络层: 分析目标的ip是否是当前主机的ip
数据链路层: 分析是否当前主机是否是目标主机的mac地址
物理层: 将电压变成二进制数据


## 代码题



#### 1.统计指定目录中文件总大小。要考虑目录中还有子目录的情况。可以同步编码,异步更好。
```javascript
var fs = require('fs');

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path) {
  var filesList = [];
  readFile(path, filesList);
  return filesList;
}

//遍历读取文件
function readFile(path, filesList) {
  files = fs.readdirSync(path); //需要用到同步读取
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList);
    } else {
      //创建一个对象保存信息
      var obj = new Object();
      obj.size = states.size; //文件大小，以字节为单位
      obj.name = file; //文件名
      obj.path = path + '/' + file; //文件绝对路径
      filesList.push(obj);
    }
  }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', complete);
  function complete() {
    console.log('文件生成成功');
  }
}

var filesList = geFileList('G:/nodejs');
filesList.sort(sortHandler);
function sortHandler(a, b) {
  if (a.size > b.size) return -1;
  else if (a.size < b.size) return 1;
  return 0;
}
var str = '';
for (var i = 0; i < filesList.length; i++) {
  var item = filesList[i];
  var desc =
    '文件名:' +
    item.name +
    '  ' +
    '大小:' +
    (item.size / 1024).toFixed(2) +
    '/kb' +
    '  ' +
    '路径:' +
    item.path;
  str += desc + '\n';
}

writeFile('test.txt', str);

```




#### 2.编写单向链表类并且实现队列的入列出列操作。
```javascript
class Node{
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList{
  constructor(head, size) {
    this.head = null 
    this.size = 0
  }
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('越界了')
    }
    let currentNode = this.head
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  add(index, element) {
    if (arguments.length == 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('cross the border')
    }
    if (index == 0) {
      let head = this.head // 保存原有 head 的指向
      this.head = new Node(element, head)
    } else {
      let prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }

  remove(index) {
    let rmNode = null 
    if (index == 0) {
      rmNode = this.head 
      if (!rmNode) {
        return undefined
      }
      this.head = rmNode.next
    } else {
      let prevNode = this._getNode(index -1)
      rmNode = prevNode.next
      prevNode.next = rmNode.next
    }
    this.size--
    return rmNode
  }
  set(index, element) {
    let node = this._getNode(index)
    node.element = element
  }
  get(index) {
    return this._getNode(index)
  }
  clear() {
    this.head = null 
    this.size = 0 
  }
}

class Queue{
  constructor() {
    this.linkedList = new LinkedList()
  }
  enQueue(data) {
    this.linkedList.add(data)
  }
  deQueue() {
    return this.linkedList.remove(0)
  }
}

const q = new Queue()

q.enQueue('node1')
q.enQueue('node2')

let a = q.deQueue()
a = q.deQueue()
a = q.deQueue()

console.log(a)


```




#### 3.基于Node写出一静态服务器。接收请求并且响应特定目录(服务器目录)中的html、css、js、图片等资源。
```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  // console.log('请求进来了')
  // 1 路径处理
  let {pathname, query} = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  let absPath = path.join(__dirname, pathname)
  // console.log(absPath)
  // 2 目标资源状态处理
  fs.stat(absPath, (err, statObj) => {
    if(err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }
    if (statObj.isFile()) {
      // 此时说明路径对应的目标是一个文件，可以直接读取然后回写
      fs.readFile(absPath, (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    } else {
      fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    }
  })
})
server.listen(1234, () => {
  console.log('server is start.....')
})

```