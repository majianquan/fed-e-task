// setTimeout(function() {
//     var a = 'hello';
//     setTimeout(function() {
//         var b = "lagou";
//         setTimeout(function(){
//             var c = "i love you"
//             console.log(a+b+c);
//         },10)
//     },10)
// },10)


// 优化之后
function timeoutFn(data) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(data)
        },10)
    })
}

timeoutFn().then(_ => {
    var a = 'hello';
    return timeoutFn(a)
}).then(a => {
    var b = 'lagou'
    return timeoutFn({a,b})
}).then(({a,b}) => {
    var c = "i love you"
    console.log(a+b+c);
})