const handler = {
  get: function (target, name) {
    return name in target ? target[name] : `Not Found property:${name}`;
  },
};
const target = {};

const p = new Proxy(target, handler);
p.a = 100;
p.b = undefined;

console.log(p.a, p.b);
// -> Output : 100 undefined
console.log(p.c);
// -> Output : Not Found propery:c

export default "Basic.js";
