---
title: "Promises, Async/Await in JS"
date: 2018-07-05T00:12:17+05:30
draft: true
author: "RC"
cover_image: /images/promiseAsyncJS/cover.jpeg
---
See the pyramid shape and all the `})` at the end? This is affectionately known as __callback hell__. The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.
<!--more-->

Asynchronous JavaScript uses callbacks, nesting of callbacks results in __callback hell__. This leads to code, very hard to read and maintain.
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
In Synchronous programming second line of code cannot execute until the previous line has finished its execution. If you are reading a file from database the main thread will be blocked until the file is read, which means no other operation can be done in meantime. 
<br>
To solve this you have to manage threads manually.
<div class="row">
    <img class="responsive-img col l9 offset-l1 m12 s12" src="/images/promiseAsyncJS/sync1.jpg">
</div>

> Asynchronous I/O is a form of input/output processing that permits other processing to continue before the transmission has finished.

In Asynchronous programming a unit of work can run separately from the primary thread. When the work is completed, it notifies the main thread whether the work was completed or failed.

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

Callbacks are just a convention for using JavaScript functions. Instead of immediately returing a value, a function that uses callbacks takes some time to produce result. Callbacks are used to achieve single threaded asynchronous behaviour in JavaScript.

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
Howerver a function that are async and use callback does not return anything immediately. Instead you specify the code that should run after the function execution has finished. 
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
In this case the image may take a very long time to download but our program is not blocked, waiting for image to be downloaded. When the download finishes the function `handlePhoto` is called.

<br>
### Pyramid of doom
When a a programmer accustomed to write synchronous code, writes asynchronous in JavaScript, it leads to callback hell.

Nesting of callback is called __callback hell__.
<div class="row">
    <img class="responsive-img col l8 offset-l2 m10 offset-m1 s10 offset-s1" src="/images/promiseAsyncJS/callback_hell_meme.jpg">
</div>

Only way to perform an action when a function finishes is inside a callback. For multiple asynchronous actions that follow one after another we will have code like this: 
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

A `Promise` object represents a value that that may not be available but resolved at some time in future. It allows you to write asynchronous code in a more synchronous fashion.

Essentially, promise is a returned object to which you attach callback, instead of passing callbacks into a function. The core idea behind promises is that, it represents the result of an asynchronous operation.

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
The function passed to `Promise` constructor is called executor. When promise is created the executor executes automatically. The `resolve` and `reject` functions are called when the promise resolve or reject, respectively. 

<div class="row">
    <img class="responsive-img col l10 offset-l1 m10 offset-m1 s12" src="/images/promiseAsyncJS/promise-resolve-reject.png">
</div>

Initally the promise is in __pending__ state. Executor initiates some async work, once that completes it either calls `resolve` to __resolve__ the promise or `reject` if an error occurred. 

> A promise is said to be __settled__ if it is either fulfilled or rejected, but not pending.

#### Creating a promise
`Promise` object is created using the `new` keyword and promise constructor. This constructor take a 'executor function' as argument. This function should have two parameters, first of these a `resolve` function. The second, a `reject` function.

Consumer functions `.then` and `.catch` can be registered to receive the result or error. The first argument of `then` is a function that runs when promise is resolved and receives the result. The second argument is the function which runs when promise is rejected and receives the error.
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

> In case of rejection the second function will be executed.

For handling errors we can also use `.catch`. Which is same as `.then(null, errorHandlingFunction)`.
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
A common need is to execute two or more asynchronous functions one after the other, where each subsequent operation start when the previous is succeeds. This can be accomplish via __promise chaining__.

The `then()` return a new promise, therefore execution is suspended util the promise is resolved. After that the result of that promise is is given to next `then()`.
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