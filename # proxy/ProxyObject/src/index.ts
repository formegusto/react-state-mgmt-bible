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
/*
concept memo
Object.getOwnPropertyDescriptor
객체 프로퍼티의 데스크립터를 조회할 수 있다.
(+) 프로퍼티 어트리뷰트
*/
function extend(sup: any, base: any): any {
  const descriptor: PropertyDescriptor | undefined =
    Object.getOwnPropertyDescriptor(base.prototype, "constructor");
  base.prototype = Object.create(sup.prototype);

  const handler: ProxyHandler<any> = {
    // new 사용을 위한 프로퍼티
    construct: function (target: Function, args) {
      var obj = Object.create(base.prototype);
      // 1. 아 여기서 호출 하면
      this.apply!(target, obj, args);
      return obj;
    },

    // 함수 호출을 위한 프로퍼티
    apply: function (target: Function, that, args) {
      // 2. 여기로 들어감
      // 3. 그러면 함수 Function이 첫 번째 매개변수로 thisArg가 붙는데,
      // 4. 우리가 두 번째로 보내 준 확장하고 싶은 친구의 프로토타입이 붙는 거임 (that)
      // 5. 그러면 sup 생성자가 호출되면서 this는 obj니까 args에 있는 값들이 obj에 붙고
      // 6. 두번째, 확장하고 싶은 친구한테 붙는거지
      sup.apply(that, args);
      base.apply(that, args);
    },
  };

  // 생성자 함수를 proxy로 교체해주는 거임
  // 그러면 위에서 만든 proxy 객체 있잖아 걔가 construct 반환부에서
  // 확장한 놈을 보내주는 거임
  const proxy = new Proxy(base, handler);
  descriptor!.value = proxy;

  // 그렇게 변경한 propery descriptor를 반환
  Object.defineProperty(base.prototype, "constructor", descriptor!);

  return proxy;
}

/*
concept memo
생성자 함수

new 키워드로 함수 호출 시,
함수의 맨 상단에는 this = {}가 암시적으로 반영되고,
return this가 반환된다.
*/
const Person = function (this: any, name: string) {
  this.name = name;
};

var Boy = extend(Person, function (this: any, name: string, age: Number) {
  this.age = age;
});
// Boy.prototype.sex = "M";

const Peter = new Boy("Peter", 13);
console.log(Peter);
// console.log(Peter.sex);
// console.log(Peter.name);
// console.log(Peter.age);
