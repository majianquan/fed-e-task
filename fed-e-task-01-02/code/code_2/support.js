class Container {
  static of (value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this.value))
  }
}
class MayBe {
  static of(value) {
    return new MayBe(value)
  }
  constructor(value) {
    this._value = value
  }
  isNothing() {
    return this._value === null || this._value === undefined
  }
  map(fn) {
    return this.isNothing() ? this : MayBe.of(fn(this._value))
  }
}
module.exports = {
  MayBe,
  Container
}
