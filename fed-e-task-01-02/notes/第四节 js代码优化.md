# 第四节 js代码优化

## 1. 简介
- 如何精准测试javaScript性能
   - 本质上就是采集大量执行赝本进行数学统计和分析,从而得出一个比对的结果
   - 使用基于Benchmark.js的https://jsperf.com完成
- 使用流程
   - 填写详细的测试用例信息(title,slug)

![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590720622967-46e52f1a-a709-4619-9b6f-d894a57d2f5c.png#align=left&display=inline&height=498&margin=%5Bobject%20Object%5D&name=image.png&originHeight=498&originWidth=1051&size=37757&status=done&style=none&width=1051)

   - 填写准备代码(DOM操作时经常使用)

![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590720705161-c8772018-5313-4b8f-9f70-7b46dbb0ee0a.png#align=left&display=inline&height=339&margin=%5Bobject%20Object%5D&name=image.png&originHeight=339&originWidth=980&size=32875&status=done&style=none&width=980)

   - 填写必要有setup(准备工作)与teardown(结束时的销毁工作)代码

![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590720754921-7109d510-f17e-41ec-ac64-5936b610ea97.png#align=left&display=inline&height=509&margin=%5Bobject%20Object%5D&name=image.png&originHeight=509&originWidth=952&size=35321&status=done&style=none&width=952)
重点是测试代码对比的片段
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590720784578-ad631d7d-09e4-4be9-a141-4eee17253569.png#align=left&display=inline&height=900&margin=%5Bobject%20Object%5D&name=image.png&originHeight=900&originWidth=1014&size=48299&status=done&style=none&width=1014)
## 2. 慎用全局变量

- 全局变量定义在全局执行上下文,是所有作用域链的顶端
   - 如果作用域链层级比较深,一层层往上找比较耗时
- 全局执行上下文一直存在于上下文执行栈,直到程序退出
   - 如果放到全局,则GC会一遍一遍的扫描,浪费时间
- 如果某个局部作用域出现了同名变量则会遮蔽或污染全局
```javascript
var i ,str = ''
for (index = 0; index < 1000; index++) {
  str += index
}

let str = ''
for (let index = 0; index < 1000; index++) {
  str += index;

}

```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590721539645-c89e6267-a6c9-46e2-8854-2ba19c8fabb8.png#align=left&display=inline&height=359&margin=%5Bobject%20Object%5D&name=image.png&originHeight=359&originWidth=976&size=28667&status=done&style=none&width=976)
## 3. 缓存全局变量
将大量采用全局变量缓存起来,提高使用效率
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="btn1">add</button>
  <button id="btn2">add</button>
  <button id="btn3">add</button>
  <p>123</p>
  <button id="btn4">add</button>
  <button id="btn5">add</button>
  <button id="btn6">add</button>
  <p>456</p>
  <button id="btn7">add</button>
  <button id="btn8">add</button>
  <button id="btn9">add</button>
  <script>
      function getBtn() {
        let btn1 = document.getElementById('btn1')
        let btn3 = document.getElementById('btn3')
        let btn5 = document.getElementById('btn5')
        let btn7 = document.getElementById('btn7')
        let btn9 = document.getElementById('btn9')
      }
      function getBtn2() {
        let obj = document
        let btn1 = obj.getElementById('btn1')
        let btn3 = obj.getElementById('btn3')
        let btn5 = obj.getElementById('btn5')
        let btn7 = obj.getElementById('btn7')
        let btn9 = obj.getElementById('btn9')
      }
  </script>
</body>
</html>

```
准备代码中放入body的内容,不包括脚本
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590722490936-2e7afa8c-c541-439b-8c7d-d470995ecf01.png#align=left&display=inline&height=488&margin=%5Bobject%20Object%5D&name=image.png&originHeight=488&originWidth=1000&size=50470&status=done&style=none&width=1000)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590722447819-8129f374-4bd5-4344-a26a-bb3e22aad4e3.png#align=left&display=inline&height=575&margin=%5Bobject%20Object%5D&name=image.png&originHeight=575&originWidth=974&size=54143&status=done&style=none&width=974)
## 4. 通过原型对象添加附加方法
```javascript
var fn1 = function () {
  this.foo = function() {
    console.log('11111');
  }
}
let f1 = new fn1()

var fn2 = function() {}
fn2.prototype.foo = function() {
  console.log('11111');
}

let f2 = new fn2()

```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590722935754-e6d1fe76-8afb-44dd-b91d-5cf3fd0ce614.png#align=left&display=inline&height=433&margin=%5Bobject%20Object%5D&name=image.png&originHeight=433&originWidth=969&size=32202&status=done&style=none&width=969)
## 5. 避开闭包陷阱
闭包使用不当会造成内存泄漏
```javascript
function test(func) {
  console.log(func());
} 
function test2(){
  var name = 'log'
  return name
}

test(function(){
  var name = 'log'
  return name
})

test(test2)
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590723486123-85928d1e-632b-4f82-942b-2dac69e6cde0.png#align=left&display=inline&height=404&margin=%5Bobject%20Object%5D&name=image.png&originHeight=404&originWidth=1079&size=34835&status=done&style=none&width=1079)
## 6. 避开属性访问方法使用

- js不需要属性的访问方法,所有的属性都是外部可见的
- 使用属性访问方法只会增加一层重定义,没有访问的控制力

![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590727643982-495d1c1b-cd58-4531-bbf8-414f501d5be2.png#align=left&display=inline&height=489&margin=%5Bobject%20Object%5D&name=image.png&originHeight=489&originWidth=1012&size=36498&status=done&style=none&width=1012)
```javascript
function Person() {
  this.name = 'xiaoming'
  this.age = 18
  this.getAge = function() {
    return this.age
  }
}
const p1 = new Person()
p1.getAge()


function Person() {
  this.name = 'xiaoming'
  this.age = 18
}
const p1 = new Person()
p1.age

```
## 7. For循环优化
缓存数组的长度
```javascript
var array = []
array[10000] = 'test'

for (let index = 0; index < array.length; index++) {
  console.log(array[index]);
}

let length = array.length
for (let index = 0; index < length; index++) {
  console.log(array[index]);
}

for (let index = array.length -1; index >= 0 ; index--) {
  console.log(array[index]);
}


```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590728288250-555bebe6-50ee-4dc3-816c-6c5df2aa6abd.png#align=left&display=inline&height=404&margin=%5Bobject%20Object%5D&name=image.png&originHeight=404&originWidth=963&size=26674&status=done&style=none&width=963)
## 8. 选择最优的循环方式
for / forEach / forin 三个遍历方式,那个更优
```javascript
var array =  [1,2,3,4,5]
array.forEach(item => {
  console.log(item);
})
for (let index = array.length -1; index >= 0 ; index--) {
  console.log(array[index]);
}
for (const index in array) {
  console.log(array[index]);
}

```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590728529224-ae1e6df1-2a58-4590-89b3-ac3d84faf68a.png#align=left&display=inline&height=385&margin=%5Bobject%20Object%5D&name=image.png&originHeight=385&originWidth=969&size=26270&status=done&style=none&width=969)
## 9. 文档碎片优化节点添加
使用const fragEle = document.createDocumentFragment()创建节点
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
    for (let index = 0; index < 10; index++) {
      var op = document.createElement('p')
      op.innerHTML = i
      document.body.appendChild(op)

    }
    const fragEle = document.createDocumentFragment()
    for (let index = 0; index < 10; index++) {
      var op = document.createElement('p')
      op.innerHTML = i
      fragEle.appendChild(op)
    }
    document.body.appendChild(fragEle)
  </script>
</body>
</html>

```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590729062200-d83a41bb-3cca-4cd4-ae11-00895432fd18.png#align=left&display=inline&height=403&margin=%5Bobject%20Object%5D&name=image.png&originHeight=403&originWidth=972&size=26847&status=done&style=none&width=972)
## 10. 克隆优化节点操作
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590729575999-12da4e8b-7eae-4d59-b734-f1a84f19d8ac.png#align=left&display=inline&height=436&margin=%5Bobject%20Object%5D&name=image.png&originHeight=436&originWidth=980&size=34079&status=done&style=none&width=980)
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p id="box1">old</p>
  <script>
    for (let index = 0; index < 3; index++) {
      var op = document.createElement('p')
      op.innerHTML = index
      document.body.appendChild(op)

    }
    const oldP = document.getElementById('box1')
    for (let index = 0; index < 3; index++) {
      var newP = oldP.cloneNode('p')
      newP.innerHTML = index
      document.body.appendChild(newP)

    }
    document.body.appendChild(fragEle)
  </script>
</body>
</html>

```
## 11. 直接量替换 new Object
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590729665718-c9ca2b5b-c840-461b-819c-46c7c8d0173d.png#align=left&display=inline&height=247&margin=%5Bobject%20Object%5D&name=image.png&originHeight=247&originWidth=974&size=18086&status=done&style=none&width=974)
```javascript
var a = [1,2,3]
var a1 = new Array
a1[0] = 1
a1[1] = 2
a1[2] = 3

```
