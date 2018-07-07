---
title: "Promises in JS"
date: 2018-07-07T00:12:17+05:30
draft: false
author: "RC"
cover_image: /images/promiseAsyncJS/cover.jpeg
---
See the pyramid shape and all the `})` at the end? This is affectionately known as __callback hell__. The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.
<!--more-->

Asynchronous JavaScript uses callbacks, nesting of callbacks results in __callback hell__. This leads to a code, very hard to read and maintain.
``` javascript
users.get(5, function(err, data){
    messges.get(data.userId, function(err, data){
        replies.get(data.messageId, function(err, data) {
            ...
        });
    });
})
```

### Sync vs Async
In Synchronous programming, the second line of code cannot execute until the previous line has finished its execution. If you are reading a file from database the main thread will be blocked until the file is read, which means no other operation can be done in meantime. 
<br>
To solve this you have to manage threads manually.
<div class="row">
    <img class="responsive-img col l9 offset-l1 m12 s12" src="/images/promiseAsyncJS/sync1.jpg">
</div>

> Asynchronous I/O is a form of input/output processing that permits other processing to continue before the transmission has finished.

In Asynchronous programming, a unit of work can run separately from the primary thread. When the work is completed, it notifies the main thread whether the work was completed or failed.

The word 'Asynchronous' just means _takes some time_ or _happens in the future, not right now_. 
<div class="row">
    <img class="responsive-img col l9 offset-l1 m12 s12" src="/images/promiseAsyncJS/sync2.png">
</div>

<br>
### What are callbacks?
A callback function, also known as a higher-order function, is a function that is passed to another function as a parameter.
``` javascript
//Classic example of callback functions in basic JavaScript

var Print = function(eachName, index) {
    console.log(index + 1 + ". " + eachName) 
}

var friends = ["Mike", "Stacy", "Andy", "Rick"]

friends.forEach(Print) // 1. Mike, 2. Stacy, 3. Andy, 4. Rick
```
> Here we pass a function to `forEach` method as parameter.

Callbacks are just a convention for using JavaScript functions. Instead of immediately returing a value, a function that uses callbacks takes some time to produce the result. Callbacks are used to achieve single-threaded asynchronous behavior in JavaScript.

In JS, functions are first-class objects. They can be stored in variables, passed as arguments to functions, created within functions, and returned from functions.

When you call a normal function you can use its return value:
``` javascript
function multiplyNums(a, b) {
    return a * b
}

var ans = multiplyNums(5, 10)
console.log(ans)
```
<br>
A function that is async and uses callback does not return anything immediately. Instead, you specify the code that should run after the function execution has finished. 
``` javascript
downloadPhoto('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', handlePhoto)
// handlePhoto is passed as callback

function handlePhoto(err, photo) {
    if(err)
        console.log('Error occured!')
    else
        console.log('Download finished')
}
```
In this case, the image may take a very long time to download but our program is not blocked, waiting for the image to be downloaded. When the download finishes the function `handlePhoto` is called.

<br>
### Pyramid of Doom
When a programmer accustomed to writing synchronous code, writes asynchronous code in JavaScript, it leads to callback hell.

Nesting of callback is called __callback hell__.
<div class="row">
    <img class="responsive-img col l8 offset-l2 m10 offset-m1 s10 offset-s1" src="/images/promiseAsyncJS/callback_hell_meme.jpg">
</div>

The only way to perform an action when a function finishes is inside a callback. For multiple asynchronous actions that follow one after another we will have code like this: 
``` javascript
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...continue after all scripts are loaded (*)
          }
        });

      }
    })
  }
});
```
1. We load `1.js`.
2. If there is no error, load `2.js`.
3. If there is no error, load `3.js`.   

As calls become more nested, the code becomes deeper and increasingly more difficult to manage. Soon it spirals out of control.

<br>
### Promises
> A `Promise` is an object representing the eventual completion or failure of an asynchronous operation.

A `Promise` object represents a value that may not be available but resolved at some time in future. It allows you to write asynchronous code in a more synchronous fashion.

Essentially, a promise is a returned object to which you attach callback, instead of passing callback as a function parameter. The core idea behind promises is that it represents the result of an asynchronous operation.

Promise is in one of three different states.

* Pending - Initial state of promise.
* Resolved - State representing a successful operation.
* Rejected - The state representing failed operation.

#### Syntax
``` javascript
 new Promise( /* executor */ function(resolve, reject) { ... } );
``` 
Example:
``` javascript
let promise = new Promise(function(resolve, reject) {
    //executor
})
```
The function passed to `Promise` constructor is called executor. When a promise is created the executor executes automatically. The `resolve` and `reject` functions are called when the promise resolve or reject, respectively. 

<div class="row">
    <img class="responsive-img col l10 offset-l1 m10 offset-m1 s12" src="/images/promiseAsyncJS/promise-resolve-reject.png">
</div>

Initially, the promise is in __pending__ state. Executor initiates some async work, once that completes it either calls `resolve` to __resolve__ the promise or `reject` if an error occurred. 

<div class="row">
    <img class="responsive-img col l10 offset-l1 m10 offset-m1 s12" src="/images/promiseAsyncJS/promise-settled.png">
</div>

A promise is said to be __settled__ if it is either fulfilled or rejected, but not pending.

#### Creating a promise
`Promise` object is created using the `new` keyword and promise constructor. This constructor takes an 'executor function' as an argument. This function should have two parameters, first of these a `resolve` function. The second, a `reject` function.

Consumer functions `.then` and `.catch` can be registered to receive the result or error. The first argument of `then` is a function that runs when the promise is resolved and receives the result. The second argument is the function which runs when the promise is rejected and receives the error.
``` javascript
let promise = new Promise((resolve, reject) => {
    console.log('Initial')

    resolve()
})

promise.then(() => {
    console.log("first then")
}, () => {
    console.log('Error')
})
```
<div class="row">
    <img class="responsive-img" src="/images/promiseAsyncJS/promise-output.png">
</div>

The executor is executed and promise is in pending state. When the promise is resolved the first function of `.then` is executed.

> In case of rejection, the second function will be executed.

For handling errors, we can also use `.catch`. Which is same as `.then(null, errorHandlingFunction)`.
``` javascript
let promise = new Promise((resolve, reject) => {
    console.log('Initial')

    reject(new Error('200'))
})

promise.then(() => {
    console.log("first then")
}).catch((arg) => {
    console.log(`Error: ${arg}`)
})

//Shows 'Initial' then 'Error: 200' as output
```

#### Promise Chaining
A common need is to execute two or more asynchronous functions one after the other, where each subsequent operation start when the previous is succeeds. This can be accomplished via __promise chaining__.

The `then()` return a new promise, therefore execution is suspended until the promise is resolved. After that, the result of that promise is given to next `then()`.
``` javascript
var f = function() {
  return new Promise((resolve, reject) => {
    console.log('First')
    resolve('200')
  })
}

var f1 = function(arg) {
  return new Promise((resolve, reject) => {
    console.log('Second')
    resolve(arg)
  })
}

var f2 = function(arg) {
  return new Promise((resolve, reject) => {
    console.log('Third')
    resolve(arg)
  })
}

f().then((result) => {
  return f1(result)
}) 
.then((result) => {
  return f2(result)
})
.then((result) => {
  console.log(result)
})

```
* `f1()` is called when `f()` finishes execution
* `f2()` is called when `f1()` finishes execution
* Order of execution: `f()->f1()->f2()`

<div class="row">
    <img class="responsive-img" src="/images/promiseAsyncJS/promise-chain.png">
</div>

<br>
Promise chaining helps in avoiding 'callback hell' or 'pyramid of doom'. 
```javascript
doAsync1(function () {
    doAsync2(function () {
        doAsync3(function () {
        })
    })
)}
```
We can attach our callbacks to resolved promise, forming a promise chain.
``` javascript
doAsync1.then(function() {
  return doAsync2()
})
.then(function() {
  return doAsync3()
})
.then(function() {
  console.log('Got the final result')
})
.catch(failureCallback);
```

#### Promise API
##### Promise.resolve()
Returns a promise object resolved with given value. The method is used when we already have a value but would like to have it “wrapped” into a promise.
``` javascript
let promise = Promise.resolve(value)
```

Example:
``` javascript
// Using the static Promise.resolve method
Promise.resolve('Success').then(function(value) {
  console.log(value); // "Success"
}, function(value) {
  // not called
});

// Resolving an array
var p = Promise.resolve([1,2,3]);
p.then(function(v) {
  console.log(v[0]); // 1
});
```

> Further reading: [MDN Promise.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

<br>
##### Promise.reject()
The `Promise.reject(reason)` method returns a Promise object that is rejected with the given reason.
``` javascript
let promise = Promise.reject(error);
```

> Further reading: [MDN Promise.reject()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

<br>
##### Promise.all()
The `Promise.all(iterable)` returns a single Promise that resolves when all of the promises in the `iterable` argument have resolved. It rejects with the reason of the first promise that rejects.
``` javascript
let promise = Promise.all(iterable)
```
The returned promise resolves when all of the promises are settled and has an array of their results.
If any of the passed-in promises reject, Promise.all asynchronously rejects the promise, whether or not the other promises have resolved.

Example:
``` javascript
var promise1 = Promise.resolve(1);
var promise2 = Promise.resolve(2);
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'Hello, World!');
});

Promise.all([promise1, promise2, promise3])
.then((result) => {
    console.log(result)
})

// Output: Array [1, 2, "Hello, World!"]
```

> 
* If an empty iterable is passed, then this method returns (synchronously) an already resolved promise.
* If all of the passed-in promises fulfill or are not promises, the promise returned by `Promise.all` is fulfilled asynchronously.

A common trick is to map an array of jobs into an array of promises, and then wrap that into `Promise.all()`.

For example, we can fetch an array of URLs in the following way:
``` javascript
const fetch = require('node-fetch')

let UserNames = ['rishabhc32', 'mittalprince', 'geekychaser']

let req = UserNames.map(name => fetch(`https://api.github.com/users/${name}`))
// 'fetch' returns a 'Promise<response>' for URL passed in argument

console.log(req)

Promise.all(req)
.then((result) => {
    result.forEach( (element) => {
        console.log(`${element.url}: ${element.status}`)
    })
})
```

<div class="row">
    <img class="responsive-img" src="/images/promiseAsyncJS/promise-all-fetch.png">
</div>

##### Fail-safe Promise.all()
`Promise.all` is rejected if any of the elements are rejected. For example, if you pass in three promises and one promise rejects immediately, then `Promise.all` will reject immediately.

It is possible to change this behavior by handling possible rejections:
``` javascript
var url = 'https://github.com/rishabhc32'

Promise.all([
    fetch(url), 
    fetch('malformed-url').catch(error => {return error}) 
])
.then(response => { 
  console.log(`${url}: ${response[0].status}`)
  console.log(`Error: ${response[1].message}`)
})
```
```
Output:
> https://github.com/rishabhc32: 200
> Error: Only absolute URLs are supported
```
This will wait until all promises are settled.

<br>
##### Promise.race()
The `Promise.race(iterable)` method returns a promise that resolves or rejects as soon as one of the promises in the `iterable` resolves or rejects. 
``` javascript
let promise = Promise.race(iterable);
```
The first result/error becomes the result of the whole `Promise.race`. All further results from resolved promises are ignored.

Example:
``` javascript
var promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'First');
})

var promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'Second');
})

Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
  // Both resolve, but promise2 is faster
})

// Output: "Second"
```
> Further reading: [MDN Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

<br>
##### Promise.finally() 
The `Promise.finally()` return a `Promise` when the promise is settled, regardless of its outcome.
``` javascript
let p = new Promise( ... )
p.finally(function() {
    // settled (fulfilled or rejected)
}) 
```
The callback specified in `Promise.finally` is always executed when the promise is settled(resolved or rejected). The `finally()` method can be useful if you want to do some processing or cleanup once the promise is settled.

Example:
``` javascript
let p = Promise.reject('hello')

p.then(() => {
    console.log('Resolved')
})    
p.catch(() => {
    console.log('Error')
})
p.finally(() => {
    console.log(`Finally`)
})
```
```
Output: 
> "Error"
> "Finally"
```

> `Promise.finally()` is part of ECMAScript specification but not yet included in NodeJS. It is only a matter of time before it lands in Node.js.
>
> Further reading:
> 
* [MDN Promise.finally()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
* [Google Web Dev](https://developers.google.com/web/updates/2017/10/promise-finally)

<br>
### Next up
Async/await in JavaScript.
