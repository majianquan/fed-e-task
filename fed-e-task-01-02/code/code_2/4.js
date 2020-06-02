const fp = require("lodash/fp");

const { MayBe, Container } = require("./support");
let ex4 = function(n) {
  if(n){return parseInt(n)}
}

let ex5 = function(n) {
  return MayBe.of(n).map(x => parseInt(x))._value
}
console.log(ex5("3.2"));
