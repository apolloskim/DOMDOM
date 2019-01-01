export default class DOMDOMNodeCollection {

  constructor(htmlElements) {
    this.htmlElements = Object.assign([], htmlElements);
  }

  html(arg) {
    if (arg !== undefined) {
      this.htmlElements.map(e => e.innerHTML = arg);
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (arg instanceof DOMDOMNodeCollection) {
      this.htmlElements.forEach(t => {
        arg.htmlElements.forEach(e => t.innerHTML += e.outerHTML);
      });
    } else if (typeof arg === 'string') {
      this.htmlElements.forEach(t => t.innerHTML += arg);
    } else if (typeof arg === 'object' && arg instanceof HTMLElement) {
      this.htmlElements.forEach(t => t.innerHTML += arg.outerHTML);
    }
  }

  attr(arg) {
    return this.htmlElements[0].getAttribute(arg);
  }

  addClass(arg) {
    if (typeof arg === 'function') {
      let count = 0;
      this.htmlElements.forEach(h => {
        h.classList.add(arg(count));
        count++;
      });
    } else if (typeof arg === 'string') {
      this.htmlElements.forEach(h => h.classList.add(arg));
    }
  }

  removeClass(arg) {
    if (arg === undefined) {
      this.htmlElements.forEach(h => h.className= "");
    } else if (typeof arg === 'string') {

      // in case there are more than one classnames to be deleted,
      // turn the string into an array of strings.
      let argArr = arg.split(" ");

      // for each classname in the array, do another for each loop on the
      // elements, then do another for loop on each of the classnames
      // in a given element.
      argArr.forEach(a => {
        this.htmlElements.forEach(h => {
          let newArr = [];
          let classNameStr = h.className;
          classNameStr = classNameStr.split(" ");
          classNameStr.forEach(c => {
            if (a !== c) {
              newArr.push(c);
            }
          });
          h.className = newArr.join(' ');
        });
      });
    }

    
  }

}
