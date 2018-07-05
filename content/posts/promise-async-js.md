---
title: "Promises, Async/Await in JS"
date: 2018-07-05T00:12:17+05:30
draft: true
author: "RC"
cover_image: /images/promiseAsyncJS/cover.jpeg
---
See the pyramid shape and all the `})` at the end? This is affectionately known as __callback hell__. The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.
<!--more-->

Asynchronous JavaScript uses callbacks, nesting of callbacks results in __callback hell__. This leads to very hard-to-read code.
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

### What are callbacks?
Callbacks are just a convention for using JavaScript functions. Instead of immediately returing a value, a function that uses callbacks takes some time to produce result. Callbacks are used to achieve single threaded asynchronous behaviour in JavaScript.

In JS, functions are first-class objects. They can be stored in variables, passed as arguments to functions, created within functions, and returned from functions.

A callback function, also known as a higher-order function, is a function that is passed to another function as a parameter