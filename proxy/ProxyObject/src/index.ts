import { KeyObj } from "./types";

// basic example
const handler: ProxyHandler<any> = {
  get: function (target: any, name: any) {
    return name in target ? target[name] : 37;
  },
};

// Proxy(target, handler)
const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);
console.log("c" in p, p.c);
/*
여기서 일반 객체에서의 get과 다른 점은 Proxy는 
target의 모든 프로퍼티에 반응한다는 것 이다.
이 말이 무슨 뜻이냐면, 일반 객체의 get은 선언된 객체에만 유니크하게 반응하지만
Proxy에 타겟 매개변수, 그리고 핸들러를 등록해주면
해당 객체의 프로퍼티에 기능을 추가한 객체변수가 만들어지는 것 이다.
*/
const exObj: KeyObj = {
  firstName: "forme",
  get lastName(): string {
    return "gusto";
  },
};
const p2 = new Proxy(exObj, handler);

console.log("firstName" in p2, p2.firstName);
console.log("middleName" in p2, p2.middlewName);
console.log("lastName" in p2, p2.lastName);

// No-op forwarding proxy, 동작의 전달
const target: KeyObj = {};
const p3 = new Proxy(target, {});

p3.a = 37;
console.log(target.a);

// Validation (검증)
const validator: ProxyHandler<any> = {
  set: function (obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 200) {
        throw new RangeError("The age seems invalid");
      }
    }

    obj[prop] = value;

    // return false;
    // TypeError: 'set' on proxy: trap returned falsish for property 'age'
    return true;
  },
};
const person: KeyObj = new Proxy({}, validator);
person.age = 100;
console.log(person.age);
// person.age = "young"; // TypeError: The age is not an integer
// person.age = 300; // RangeError: The age seems invalid

// Extending constructor (생성자 확장)
// sup : super , base : child
function extend(sup: any, base: any): any {
  const descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,
    "constructor"
  );
  base.prototype = Object.create(sup.prototype);
  const handler: ProxyHandler<any> = {
    construct: function (target, args) {
      var obj = Object.create(base.prototype);
      this.apply!(target, obj, args);
      return obj;
    },
    apply: function (target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    },
  };
  const proxy = new Proxy(base, handler);
  descriptor!.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor!);

  return proxy;
}

const Person = function (this: any, name: string) {
  this.name = name;
};

var Boy = extend(Person, function (this: any, name: string, age: Number) {
  this.age = age;
});
Boy.prototype.sex = "M";

const Peter = new Boy("Peter", 13);
console.log(Peter.sex);
console.log(Peter.name);
console.log(Peter.age);
