const fp = require("lodash/fp");

const { MayBe, Container } = require("./support");
let safeProp = fp.curry(function(x, o){return MayBe.of(o[x])})
let user = {id: 2,name: 'Albert'}
let ex3 = function(user) {
  return safeProp('name')(user).map(x => fp.first(x))._value
}
console.log(ex3(user));

