## 简答题
### 第一题
* 核心思想: 设置当前对象的引用数,判断当前引用数是否为0
* 引用计数器
* 引用关系改变时,引用计数器主动修改引用数字
* 当引用数为0时,GC开始进行回收工作,并释放空间
优点
* 发现垃圾时立即回收
* 当引用数为0时,GC立即开始进行回收工作,并释放空间
* 最大限度减少程序的暂停
* 应用程序执行的过程中必定会对内存进行消耗,当前的平台内存有上限,如果及时回收内存,可以防止内存沾满的时候
缺点
* 无法回收循环引用的对象

### 第二题
标记整理可以看做是标记清除的增强
* 遍历所有对象,找到活动对象,然后进行标记操作
* 历所有对象,把没有标记的对象进行清除,然后把第一阶段中的对象的标记进行抹除
* 清除阶段胡先整理,移动对象位置,使空闲空间地址上你能够产生连续
* 整理后会把非活动对象和空闲空间进行整理,让地址连续,然后对内存右侧的空间进行整体回收

### 第三题
 V8 新生代回收过程采用复制算法 + 标记整理,流程如下
 * 新生代内存区分为2个等大小空间, 使用空间为From,空闲空间为To
 * 一旦From的空间到达一定的大小之后,需要触发GC操作,算法为标记整理
 * 标记整理后将活动对象拷贝至To
 * 复制完成之后,就可以完全释放From空间(这时候就完成了新生代的回收操作)
 * From与To交换空间完成释放

 回收细节
    * 拷贝过程中可能出现晋升操作
    * 晋升操作是讲新生代对象移动至老生代进行存储
    * 一轮GC还存活的新生代需要晋升
    * form拷贝对象到To空间的时候,发现To空间的使用率超过25%,也需要晋升

### 第四题
    * 何时使用标记清除完成垃圾空间的回收
如果想把新生代的对象往老生代空间移动的时候,而且老生代的存储空间不足以存放新生代存储区所移过来的对象
这个情况下就会触发标记整理进行空间优化,这时候触发的回收就采用增量标记进行效率优化
    * 标记增量的原理
1.当GC执行垃圾回收的时候,会阻塞当前javascript的程序执行,所以在这里会有一个空档期
2.程序执行完之后,程序会停下来,执行当前的回收操作
3.所谓的标记增量,就是把一整段的垃圾回收操作拆成几步,组合的完成整个回收
4.从而替代我们之前一口气做完的垃圾回收操作
5.这样的好处就是程序和垃圾回收,交替的执行


## 代码题1

### 练习1
题解:
```javascript
    let isLastInStock = function(cars) {
        let last_car = fp.last(cars)
        return fp.prop('in_stock',last_car)
    }
    // 答案
    let isLastInStock2 = fp.flowRight(fp.prop('in_stock'),fp.last );
    console.log(isLastInStock2(cars));
    console.log(isLastInStock(cars));
```
### 练习2
题解:
```javascript
    const isFirstName = fp.flowRight(fp.prop('name'),fp.first)

    console.log(isFirstName(cars));
```
### 练习3
题解:
```javascript
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = function(cars) {
    let dollar_values = fp.map(function(car){
        return car.dollar_value
    },cars)
    return _average(dollar_values);
}
console.log(averageDollarValue(cars));
// 重构

const map = fp.curry((fn, array) => fp.map(fn, array)); 
let averageDollarValue2 = fp.flowRight(_average,map(item => item.dollar_value));
```
### 练习4
题解:
```javascript
    const fp = require('lodash/fp')
    let _underscore = fp.replace(/\W+/g,'_')

    let snitizeNames = fp.flowRight(_underscore, fp.join(' '), fp.map(fp.lowerCase),fp.split(' '),fp.first);


    console.log(snitizeNames(['Hello World']));
```
## 代码题2

### 练习1
题解:
```javascript
    const fp = require("lodash/fp");

    const { MayBe, Container } = require("./support");
    let maybe = MayBe.of([5, 6, 1]);
    let ex1 = function(maybe,num) {
    return maybe.map(x => fp.map(fp.curry(fp.add)(num),x))
    }
    console.log(ex1(maybe,2)._value);

```

### 练习2
题解:
```javascript
    const fp = require("lodash/fp");

    const { MayBe, Container } = require("./support");

    let xs = MayBe.of(['do','ray','me','fa','so','la','ti','do'])
    let ex2 = function(array) {
    return array.map(x => fp.first(x))._value
    }
    console.log(ex2(xs));

```
### 练习3
题解:
```javascript
    const fp = require("lodash/fp");

    const { MayBe, Container } = require("./support");
    let safeProp = fp.curry(function(x, o){return MayBe.of(o[x])})
    let user = {id: 2,name: 'Albert'}
    let ex3 = function(user) {
    return safeProp('name')(user).map(x => fp.first(x))._value
    }
    console.log(ex3(user));

```
### 练习4
题解:
```javascript
    const fp = require("lodash/fp");

    const { MayBe, Container } = require("./support");
    let ex4 = function(n) {
    if(n){return parseInt(n)}
    }

    let ex5 = function(n) {
    return MayBe.of(n).map(x => parseInt(x))._value
    }
    console.log(ex5("3.2"));


```