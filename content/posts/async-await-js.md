---
title: "Async/Await in JS"
date: 2018-07-08T21:53:06+05:30
draft: true
author: "RC"
cover_image: /images/async-await/cover.png
---
ECMAScript 2017 brought in syntactic sugar on top of `Promises` in JavaScript in form of `async` and `await`. Async/await provides a special syntax to work with promises in a more comfortable fashion. They  allow us to write asynchronous Promise-based code in synchronous manner.

<!--more-->

Before proceeing with __aysnc/await__ you need to understand __Promises__. You can head over to [Promises in JS](https://zapcircle.net/posts/promise-js/) article to read and learn about promises.

### Async functions
> The async function declaration defines an asynchronous function. An asynchronous function is a function which operates asynchronously via the event loop.

Keyword `async` can be placed before a function:
``` javascript
async function f() {
    // function-body
}
```
An "async" function always returns a promise. If returned value is `non-promise` then JavaScript wraps it in an implicit `Promise`.

Example:
``` javascript
async function f() {
  return 1;
}

f().then(result => {
  console.log(result)
})

// Output: 1
```
> `Async` function returns a `Promise` which will be resolved with the value returned by the async function, or rejected with an uncaught exception thrown from within the async function.

<br>
### Await
The `await` operator is used to wait for a `Promise`. It can only be used inside an `async` function.

``` javascript
let value = await promise
```
The `await` expression causes `async` function to pause execution until the `Promise` is settled.  
The value of `await` expression is that of resolved promise. If `Promise` is rejected, await `throws` the rejected value.

Example from MDN:

{{< highlight javascript "linenos=table, title=await">}}
function resolveAfter2Seconds(x) { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, 2000)
  })
}

async function f1() {
  var x = await resolveAfter2Seconds(10); //wait till promsie is resolved 
  console.log(x); // 10
}
f1();

// Prints '10' after 2 seconds
{{< /highlight >}}

The function `f1` execution pauses at __line 10__ and resumes when the promise is settled. The variable `x` has result of resolved promise that is, `10`.

`Await` is a more polished syntax of getting promsie result as compared to `Promise.then`. We can chain promises more elegantly with `await` than `Promise.then()`.

Insted of this:
``` javascript
doAsync1.then(function(result) {
  return doAsync2(result)
})
.then(function(result) {
  return doAsync3(result)
})
.then(function(result) {
  console.log('Got the final result')
})
.catch(failureCallback);
```

We can do this:
``` javascript
async function f() {
    let v1 = await doAsync1()
    let v2 = await doAsync2(v1)
    let v3 = await doAsync3(v2)

    console.log('Got the final result')
}
f()
```
> `Await` won't work in top-level code. It can also be used inside an `async function`.

#### Error Handling
If promise if fulfilled then await returns its result. But in case of rejection it `throws` an error. We can use simple `try...catch ` statement to `catch` the error.

``` javascript
var f = async function() {
  try {
    let v = await Promise.reject(new Error("Invalid Statement"))
  } catch(err) {
    console.log(err.message)
  }
}()

// Output: "Invalid Statement"
```

<br>
Handling rejected `Promsie` without try block.
``` javascript
var f = async function() {
  let result = await Promise.reject(new Error("Invalid Statement"))
}

f().catch(err => {
  console.log(err.message)
})

// Output: "Invalid Statement"
```