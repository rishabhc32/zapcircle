---
title: "Asynchronous JavaScript"
date: 2018-07-10T16:04:49+05:30
draft: false
author: "Rishabh Kr Bothra"
cover_image: "/images/asyncJS/Js.png"
---



Javascript code runs on a single thread and hence should be synchronous 
in nature. synchronous code waits for one action to complete before moving
 on to next task. But even after JS is considered as single threaded 
 we are able to perform tasks parallely **HOW?**  
<!--more-->

```javascript
var test = readSync(file_loc);
		console.log(test);
		var test2 = readSync(file_loc2);
		console.log(test2);
```
This task is done synchronously first file is fetched and test is logged then  
next file is fetched and logged. What if the file1 is huge file and lets say  
take **10sec** to be fetched then this become blocking i/o and decreases UX.  
 So to get rid of this situation we can do same task **asynchronously** 
 
 ```javascript
readAsync(file_loc,(test)=>{
			console.log(test);	
			});

			readAsync(file_loc2,(test2)=>{
			console.log(test2);	
			});
```
In this case file1 and file2 both are fetched parallely and file which is 
fetched first is being logged first this becomes non-blocking code and takes
lesser time to execute.

<div class="row">
        <img class="responsive-img col" src="/images/asyncJS/async.png">
    </div>



## What is Asynchronous JavaScript?
> Asynchronous JS basically means, codes which starts now, and finishes 
at a later point in time and can perform any other task simultaneously 
in the time.

Fetching data from a json file using AJAX request:
```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ajax</title>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script>
        window.onload = function() {

            $.get("zap.json", function (data) {
                console.log(data);
            });

            console.log("later");
        };
    </script>
</head>
<body>

</body>
</html>
```
**output**

<div class="row">
        <img class="responsive-img col" src="/images/asyncJS/Async.png">
    </div>


Here `later` is printed first while the data is being fetched from json file and 
as soon as the data is fetched then the callback function is fired and data
is being printed.


**AJAX** : Asynchronous JavaScript And XML  
 Communicate with server by making http request and retrieves data from server
 No without reloading the page which we can use in our code. XML refers to as
 the data which we try to fetch , we can also use JSON instead of XML.
 Consider google maps we are able to fetch different locations without
 refreshing the page,thats how AJAX is advantageous. 


### How AsyncJS works?
  
* Callback
* Promises
* Generators

#### Callback function

A callback function, also known as a higher-order function, is a function 
that is passed to another function as a parameter, and the callback function is called 
inside the otherFunction. A callback function is essentially a pattern,
  and therefore, the use of a callback function is also known as a 
  callback pattern.  
  Callback implemented using jQuery
  ```javascript
window.onload = function() {

    $.ajax({
        type:"GET",
        url:"zap.json",
        success:function(data){
            console.log(data);

            $.ajax({
                type:"GET",
                url:"test.json",
                success:function(data){
                    console.log(data);

                    $.ajax({
                        type:"GET",
                        url:"test2.json",
                        success:function(data){
                            console.log(data);
                        },
                        error:function (err) {
                            console.log(err);
                        }
                    })


                },
                error:function (err) {
                    console.log(err);
                }
            })


        },
        error:function (err) {
            console.log(err);
        }
    })
};
```
> Here function inside a function is being called only if the previous
 function executes without any error this is called **callback functions**. 
See the pyramid shape and all the `})` at the end? Eek! This is 
 affectionately known as **callback hell**. :fearful:
 
 
 
**Output**

<div class="row">
        <img class="responsive-img col" src="/images/asyncJS/callbackhell.png">
    </div>

Callback hell can be resolved by **Modularizing** our code and handling
every single error.
Above code be rewritten by resolving callback hell as:
```javascript
window.onload = function() {

    function checkerror(err) {
        console.log(err);
    }

    $.ajax({
        type:"GET",
        url:"zap.json",
        success:friends,
        error:checkerror
    });

    function friends(data) {
        console.log(data);

        $.ajax({
            type: "GET",
            url: "test.json",
            success: test,
            error: checkerror
        });

    }

        function test(data) {
            console.log(data);

            $.ajax({
                type: "GET",
                url: "test2.json",
                success: function (data) {
                    console.log(data);
                },
                error: checkerror
            })


        }
};
```
Here errors are handled as different function and every callback function is 
declared outside which keeps the code tidy and readable.
Output remains the same :relieved:

### Promises
> Promise is an object which showes a particular task has been completed 
or not(i.e. state of a particular task).  

A promise may be in one of 3 possible states:

* Fulfilled: the operation completed successfully.
* Rejected: the operation failed.
* Pending: initial state, neither fulfilled nor rejected.  
 
Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.  

Promise is better than simple call back as we can directly use return statement and pass new promise directly, it makes code more readable and understandable and easy to execute.
   
   <div class="row">
       <img class="responsive-img col" src="/images/asyncJS/promises.png">
   </div>

   
  
  Let us consider an example to understand better that how it is better
  than normal callbacks.  
  ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Promises</title>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script>
        window.onload = function(){

            $.get("zap.json").then(function (value) {
                console.log(value);
                return  $.get("test.json");
            }).then(function (value) {
                console.log(value);
                return  $.get("test2.json")
            }).then(function (value) {
                console.log(value);

            })
        }
    </script>
</head>
<body>

</body>
</html>
```
*output* remains the same  
   <div class="row">
       <img class="responsive-img col" src="/images/asyncJS/callbackhell.png">
   </div>

function in `.then` is called when the data is retrieved and we can return 
new promise, hence it makes our code readable and output remains the same.


 <div class="row">
    <div class="col">
        <img class="responsive-img" src="/images/asyncJS/promise_hell.jpg">
    </div>
 </div>

## Generators
 > Generators provide a powerful alternative: they allow you to 
 define an iterative algorithm by writing a single function which 
 can maintain its own state.  
 
 <div class="row">
    <div class="col s12">
        <img class="responsive-img" src="/images/asyncJS/gene.png">
    </div>
 </div>
   
 
 generators are special type of functions which is used to perform
 async tasks. It is defined as `function*(){..}` on calling similarly
 as functions it returns an **iterator**. In JavaScript an iterator is
  an object that provides a next() method which returns the next item 
  in the sequence.   
  Let us consider an example :
  ```javascript
window.onload = function () {

   generator(function*(){
        var zap = yield $.get("zap.json");
        console.log(zap);
   });

    console.log("done");

    function generator(temp) {

        var gen = temp();

        function checkandprint(output){
            if(!output.done) {
                output.value.then(function (data) {
                    return checkandprint(gen.next(data));
                });
            }
        }

            return checkandprint(gen.next());
    }
};
```
here `next()` returns the value of *`done`* as true or false  and iterator is
terminated when *`done`* is *false*.  
The `next()` method also accepts a value which can be used to modify the
 internal state of the generator. A value passed to `next()` will be 
 treated as the result of the last **`yield`** expression that paused the 
 generator.This pause help us make user-defined iterables.  
 
 <div class="row">
        <img class="responsive-img col" src="/images/asyncJS/pro+gene.png">
    </div>
 
 There is no opposition between these two techniques. They coexist 
 together complementing each other nicely. Promises resolves the 
 callback hell problem but even in promises there are callbacks and
 if the code is huge it becomes difficult to debug an issue. So we want 
 to write *asynchronous* code in *synchronous* manner, Here comes the 
 **generators** which gives us power to write asynchronous code which
 seems to synchronous using promises, this combined concept is called 
 **Async/Await**  
 
## What is the best way among all?

 <div class="row">
        <img class="responsive-img col" src="/images/asyncJS/thinking.png">
    </div>
 Now this totally depends on use case. Different methods have different
 advantages and disadvantages.  
 Callbacks is the fastest solution possible at this time
  (performance of native promises are not soo good). Promises with 
  generators give you opportunity to write asynchronous code in
   synchronous fashion. But for now they much slower then simple
    callbacks.
    
### Further Readings  
   
>[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
   
>[Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)  
   
>[Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
    
    
   
