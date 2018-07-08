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
// result will be undefined if the promise is rejected

f().catch(err => {
  console.log(err.message)
})

// Output: "Invalid Statement"
```
<br>
### Example
__Callbacks__ are not interchangeable with __Promises__. This means that callback based APIs cannot be used as `Promises`.  

But we can wrap a library using callback-based API inside a `Promise`.

Example:
``` javascript
const request = require('request')

function get_response() {
    return new Promise((resolve, reject) => {
        request.get(options, (err, res, body) => {
            if(err) 
                reject(err)
            else
                resolve(JSON.parse(body))
        })
    })
}
```
`request` library uses callbacks. Here we wrap it inside a function returning `Promsie`. The function is then responsible for calling resolve when it’s done or reject if there are errors.

Now we can use `.then()` or `await` on the returned `Promise`.
``` javascript
var options = {
    url: 'https://api.github.com/users/rishabhc32',
    headers: {
        'User-Agent': 'request'
    }
}

get_response()
.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log('Error occured')
})
```

``` javascript
let another_response = async function() {
    options.url = 'https://api.github.com/users/mittalprince'

    let result = await get_response()
    console.log(`login id: ${result.login} \nid: ${result.id}`)

    options.url = 'malformed-url'
    
    try {
        let result = await get_response()
    } catch(err) {
        console.log(`Error: ${err.message}`)
    }
 }()  
```

<div class="row">
    <img class="responsive-img" src="/images/async-await/example-output.png">
</div>

<br>
### Further reading
* [MDN async/await example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#Simple_example)
* [MDN async function expression] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)
