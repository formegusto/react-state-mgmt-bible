const handler = {
  construct: function (target, args, newTarget) {
    console.log("Hello Construct :)", args.join(","));
    return {
      sumValue: args.reduce((acc, cur) => acc + cur, 0),
    };
  },
  apply: function (target, thisArg, args) {
    console.log("Hello Apply :)", args.join(","));

    return args.reduce((acc, cur) => acc + cur, 0);
  },
};
const target = function () {};

const p = new Proxy(target, handler);
console.log(p(1, 2, 3));
// Hello Apply :) 1,2,3
// 6
console.log(new p(1, 2, 3));
// Hello Construct :) 1,2,3
// { sumValue: 6 }

export default "ProxyApply.js";
