# 第三节 Performance工具

## 1.为什么使用Performance
- GC的目的是为了实现内存空间的良性循环
- 良性循环的基石是否合理
- 时刻关注才能确定是否合理
- Performance提供了多种工具监控内存变化



使用步骤

- 打开浏览器输入目标网址
- 进入开发人员工具面板,选择性能
- 开启录制功能,访问具体界面
- 执行用户行为,一段时间后停止录制
- 分析界面中记录的内存信息
- ![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590680476243-30436d22-e5a6-4917-a17c-892c7aec87b0.png#align=left&display=inline&height=749&margin=%5Bobject%20Object%5D&name=image.png&originHeight=749&originWidth=1415&size=123323&status=done&style=none&width=1415)
## 2.内存问题的体现

- 页面出现延迟加载或经常性暂停(可能出现频繁的GC)
- 页面持续性出现糟糕的性能(使用网站不流畅,感觉不是很好用,可能出现内存膨胀)(内存膨胀是我们的系统为了达到一定的效果,申请了很大的内存空间,但是内存空间远超设备所提供的内存大小)
- 页面的性能随时间延长越来越差(伴随着内存泄漏)
## 3. 监控内存的几种方式
#### 3.1 内存出现的几个问题

- 内存泄漏: 内存使用持续升高,整个过程没有下降
- 内存膨胀: 内存膨胀是我们的系统为了达到一定的效果,申请了很大的内存空间,但是内存空间远超设备所提供的内存大小
- 频繁垃圾回收: 通过内存变化图进行分析



#### 3.2 内存监控的几个方式

- 浏览器任务管理器
   - 直接以数值的形式显示当前的内存
- Timeline时序图记录,
   - 把应用程序执行过程中,内存变化的走势图,以时间点的方式给呈现出来
- 堆快照查找分离DOM
   - 很有针对性的查找,当前的界面对象是否存在分离的DOM
   - 分离的DOM就是一种内存泄漏
- 内存走势图,分享是否频繁GC



## 4. 任务管理器监控内存
google快捷键 shift + esc 调出任务管理
执行程序,观察网页内存变化
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">add</button>
    <script>
        const btn = document.getElementById('btn')
        btn.onclick = function() {
            let arr = new Array(10000000)   
        }

    </script>
</body>
</html>
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590681299165-1339f5fe-d0b7-4237-a125-d3abe1d83d09.png#align=left&display=inline&height=489&margin=%5Bobject%20Object%5D&name=image.png&originHeight=489&originWidth=1054&size=72480&status=done&style=none&width=1054)
## 5.Timeline记录内存
界面连续点击四次,内存走势图有升有降,显示正常
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">add</button>
    <script>
        const arr = []
        function test() {
            for (let index = 0; index < 110000; index++) {
                document.body.appendChild(document.createElement('p'))
                
                arr.push(new Array(1000000).join('x'))
            }
        }
        document.getElementById('btn').addEventListener('click',test)
    </script>
</body>
</html>
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590712054272-85d3aad6-6d9d-42c2-94d2-cabc5af476c4.png#align=left&display=inline&height=900&margin=%5Bobject%20Object%5D&name=image.png&originHeight=900&originWidth=1917&size=108684&status=done&style=none&width=1917)
## 6.堆快照查找分离DOM

- 堆快照留存js堆照片
- 什么是分离DOM
   - 界面元素存活从DOM树上分离(在界面上分离了,但是js代码还引用着,在内存还占据空间)
      - 垃圾对象是的DOM 节点
      - 分离状态的DOM节点

打开页面然后在开发者调试工具memory中执行快照
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590716352970-f9720229-c2aa-4207-a2cf-6187c1261eba.png#align=left&display=inline&height=821&margin=%5Bobject%20Object%5D&name=image.png&originHeight=821&originWidth=1431&size=86380&status=done&style=none&width=1431)
执行完之后,可以搜索对应的对象
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590716434371-9ba5ffd3-642f-4463-8a58-90533365e320.png#align=left&display=inline&height=838&margin=%5Bobject%20Object%5D&name=image.png&originHeight=838&originWidth=1407&size=111484&status=done&style=none&width=1407)


然后触发操作,再次执行快照
搜索detached关键字,发现分离的快照
![image.png](https://cdn.nlark.com/yuque/0/2020/png/222679/1590716494654-d37bb74b-8a88-4281-9549-b1a161a1060b.png#align=left&display=inline&height=853&margin=%5Bobject%20Object%5D&name=image.png&originHeight=853&originWidth=1453&size=67098&status=done&style=none&width=1453)
## 7.判断是否存在频繁GC

- GC工作时应用程序是停止的
- 频繁过长的GC会导致应用假死
- 用户使用中感知应用卡顿



怎么判断
Timeline中频繁的上升下降
任务管理器中数据频繁的增加减少
