var temp = 123;
if(true) {
    console.log(temp);
    let temp;
}
// 结果会报错
// 存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。