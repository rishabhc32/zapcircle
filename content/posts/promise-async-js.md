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
