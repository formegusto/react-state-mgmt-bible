const handler = {};
const target = {};

const p = new Proxy(target, handler);
p.a = 37;
console.log(p.a);
// Output -> 37

export default "NoOpForwarding.js";
