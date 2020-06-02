const fp = require("lodash/fp");

const { MayBe, Container } = require("./support");

let xs = MayBe.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = function(array) {
  return array.map(x => fp.first(x))._value
}
console.log(ex2(xs));
