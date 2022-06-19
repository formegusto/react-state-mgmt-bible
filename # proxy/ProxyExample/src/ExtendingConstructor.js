function extend(sup, base) {
  const descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,
    "constructor"
  );
  console.log(descriptor);
  console.log(base.prototype);
  base.prototype = Object.create(sup.prototype);
  console.log(base.prototype);

  const handler = {
    construct: function (target, args) {
      const obj = Object.create(base.prototype);
      // Person { sex: 'M' }
      this.apply(target, obj, args);
      return obj;
    },
    apply: function (target, that, args) {
      console.log("----");
      sup.apply(that, args);
      console.log(that);
      base.apply(that, args);
      console.log(that);
    },
  };
  const proxy = new Proxy(base, handler);
  //   descriptor.value = proxy;
  //   Object.defineProperty(base.prototype, "constructor", descriptor);

  return proxy;
}

const Person = function (name) {
  this.name = name;
};
const Boy = extend(Person, function (name, age) {
  this.age = age;
});
Boy.prototype.sex = "M";

const Peter = new Boy("Peter", 13);
console.log(Peter.sex); // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age); // 13

export default "ExtendingConstructor.js";
