var a = 10;
var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a);
        })
    }
}

obj.fn();
// 打印20
// setTimeout的参数是一个箭头函数，
// 这个箭头函数的定义生效是在obj对象内，如果是普通函数，执行时this应该指向全局对象window，
// 这时应该输出10。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 20}），所以输出的是20。

// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域