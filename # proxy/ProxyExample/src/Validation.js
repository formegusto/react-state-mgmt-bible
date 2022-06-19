const validator = {
  set: function (obj, prop, value) {
    if (prop !== "age") return false;
    else {
      if (!Number.isInteger(value))
        throw new TypeError("The age is not an integer");
      if (value > 200) throw new RangeError("The age seems invalid");

      obj[prop] = value;

      return true;
    }
  },
};
const target = {};
const person = new Proxy(target, validator);

person.age = 100;
console.log(person.age);
// Output -> 100

// person.age = "young";
// TypeError: The age is not an integer
// person.age = 300;
// RangeError: The age seems invalid

// person.name = "iamformegusto";
// TypeError: 'set' on proxy: trap returned falsish for property 'name'

export default "Validation.js";
