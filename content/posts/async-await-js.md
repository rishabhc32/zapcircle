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
