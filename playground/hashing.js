const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 10
};

let token = jwt.sign(data, '123abc');
console.log(token);
let returnResult = jwt.verify(token, '123abc');
console.log(returnResult.id===data.id);

// let message = "I am  user number 3";
// let hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//   id: 4
// };
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+'somesecret').toString
// };
//
// let resultHash = SHA256(JSON.stringify(data)+'somesecret').toString;
//
// if(token.hash === resultHash)
// console.log("Data was not manipulated.It can be trusted.");
// else
// console.log("Data was manipulated.You can't  trust it.");
