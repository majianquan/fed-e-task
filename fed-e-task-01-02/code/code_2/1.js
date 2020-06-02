const fp = require("lodash/fp");

const { MayBe, Container } = require("./support");
let maybe = MayBe.of([5, 6, 1]);
let ex1 = function(maybe,num) {
  return maybe.map(x => fp.map(fp.curry(fp.add)(num),x))
}
console.log(ex1(maybe,2)._value);
