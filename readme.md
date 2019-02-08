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

* `$l`: $l() is a global variable you can use to select three different data types:
  1. CSS selector
    * You can put in a string with the same name as a CSS selector in your HTML file, and it will return a DOMDOMNodeCollection class upon which you can apply all the functions that are described in further details hereafter.
  2. HTML element
    * You can also put in a HTMLElements data type, and it will also return a DOMDOMNodeCollection class.
  3. function
    * If you put in a function inside this wrapper, it will queue it to a list of functions to be invoked once the DOM is loaded. 
