# DOMDOM

[Try Demo!](https://apolloskim.github.io/DOMDOM/)

![trivia.gif](trivia.gif)

DOMDOM is a Javascript library inspired by jQuery.

### What can you do with DOMDOM?

* Select one or multiple corresponding DOM elements as well as their children and parents
* Append DOM elements inside other DOM elements
* Add/remove classes on selected DOM elements
* Queue functions until the DOM is loaded, then invoke them consecutively
* Apply/remove keyboard/mouse event listeners on selected DOM elements
* Easily make HTTP requests

### API

* ##### `$l(selector)`: $l() is a global variable you can use to select three different data types:
  * **CSS selector**: You can put in a string with the same name as a CSS selector in your HTML file, and it will return a `DOMDOMNodeCollection` class upon which you can apply all the functions that are described in further details hereafter.
  * **HTML element**: You can also put in a HTMLElements data type, and it will also return a `DOMDOMNodeCollection` class.
  * **function**: If you put in a function inside this wrapper, it will queue it to a list of functions to be invoked once the DOM is loaded.

* #### DOM Traversal
  * `children()`:
  Returns `DOMDOMNodeCollection` of all the children elements of all the nodes in the array inside the original `DOMDOMNodeCollection` class. These are only *direct* children.

  * `parent()`:
  Returns `DOMDOMNodeCollection` of all the parent elements of all the nodes in the array inside the original `DOMDOMNodeCollection` class.

  * `find(selector)`:
  Returns a `DOMDOMNodeCollection` of all the nodes matching the selector passed in as an argument that are descendants of the nodes.

* #### DOM Manipulation
  * `html(string)`:
    1. **If no argument is given**: returns the innerHTML of the first node in the `DOMDOMNodeCollection`.
    2. **If argument is given**: *reassigns* the innerHTML of each of the nodes in the `DOMDOMNodeCollection` to the given string argument.

  * `empty()`:
  Empties the innerHTML of each of the nodes in the `DOMDOMNodeCollection`.

  * `append(selector)`:
    1. `DOMDOMNodeCollection`: appends each node in the selected `DOMDOMNodeCollection` to each node in the original `DOMDOMNodeCollection`.
    2. `HTMLElement`: appends the `HTMLElement` to each node in the original `DOMDOMNodeCollection`.
    3. `string`: appends the string to each node in the original `DOMDOMNodeCollection`.

  * `attr(attribute, [attributeValue])`:
    1. **If no *attributeValue* is given**: returns the value of the attribute of the first node in the original `DOMDOMNodeCollection` that matches the string argument.
    2. **If *attributeValue* is given**: sets an attribute, given in the first argument, with the *attributeValue*, given in the second argument, for each node in the `DOMDOMNodeCollection`.

  * `addClass(className)`:
  adds a class with the name passed as an argument to each node in the `DOMDOMNodeCollection`.
  * `removeClass(className)`
  if applicable, removes a class with the name passed as an argument to each node in the `DOMDOMNodeCollection`.

  * `remove()`: removes each node in the `DOMDOMNodeCollection`.

* #### DOM Event Handling
  * `on(event, callback)`:
  adds the *event*, as well as a *callback*, to specify an action when that event is triggered to each node in the `DOMDOMNodeCollection`.

  * `off(event, callback)`:
  if added, removes that *event* from each node in the `DOMDOMNodeCollection`.

* #### HTTP Request
  * `$l.ajax(optionHash)`:
  adds an AJAX function to the `$l` function object. The default HTTP method is `GET`, but you can add an option hash as an argument where you can specify the values of keys like:
    * **method**: HTTP methods (ex: `GET`, `POST`, `PATCH`, `DELETE`)
    * **url**: URL of the website that you're making the HTTP request to.
    * **data**: an object with keys and values where, if the HTTP method is `GET`, the function will make a query string out of.
    * **contentType**: content type of HTTP request (default is **'application/x-www-form-urlencoded; charset=UTF-8'**)

  `$l.ajax` returns a *promise*. You can simply specify a success and error callback using `.then()` function.
  * Example:

  ```Javascript
  $l.ajax({
    url: `https://opentdb.com/api.php`,
    data: {"amount": 12, "category": 12, "difficulty": "easy", "type": "multiple"}
  }).then(success => console.log(success), err => console.log(err));
  ```
