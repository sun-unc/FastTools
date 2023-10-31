"use strict";
function ClassTest() {
//   console.log("new target", new.target);
  this.text = "test";
  constructor: () => {
    console.log("new target", new.target);
  };
}
var myClass = new ClassTest();
console.log(myClass);
