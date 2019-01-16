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
    return this.htmlElements;
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
    return this.htmlElements;
  }





  attr(arg, str) {
    if (str && typeof str === 'string') {
      this.htmlElements.forEach(e => e.setAttribute(arg, str));
      return this.htmlElements;
    } else {
      return this.htmlElements[0].getAttribute(arg);
    }
  }

  addClass(arg) {
    let newArg = arg.split(' ');
    this.htmlElements.forEach(h => h.classList.add(...newArg));
    return this.htmlElements;
  }

  removeClass(arg) {
    if (arg === undefined) {
      this.htmlElements.forEach(h => h.className= "");
    } else if (typeof arg === 'string') {
      let newArg = arg.split(' ');
      this.htmlElements.forEach(h => h.classList.remove(...newArg));
    }
    return this.htmlElements;
  }

  children() {
    let childNodes = [];
    this.htmlElements.forEach(h => {
      const nodeChild = Object.assign([], h.children);
      childNodes = childNodes.concat(nodeChild);
    });
    return new DOMDOMNodeCollection(childNodes);
  }

  parent() {
    let parentNodes = [];
    this.htmlElements.forEach(h => {
      if (!h.parentNode.visited) {
        parentNodes.push(h.parentNode);
        h.parentNode.visited = true;
      }
    });

    parentNodes.forEach(n => n.visited = false);
    return new DOMDOMNodeCollection(parentNodes);
  }

  find(arg) {
    let foundNodes = [];

    this.htmlElements.forEach(h => {
      const selectedNodes = h.querySelectorAll(arg);
      foundNodes = foundNodes.concat(Object.assign([], selectedNodes));
    });
    return new DOMDOMNodeCollection(foundNodes);
  }

  remove() {
    this.htmlElements.forEach(h => h.parentNode.removeChild(h));
  }

  on(eventName, cb) {
    this.htmlElements.forEach(h => {
      h.addEventListener(eventName, cb);
      const eventKey = `events-${eventName}`;
      if (h[eventKey] === undefined) {
        h[eventKey] = [];
      }
      h[eventKey].push(cb);
    });
  }

  off(eventName) {
    const eventKey = `events-${eventName}`;
    this.htmlElements.forEach(h => {
      h[eventKey].forEach(cb => h.removeEventListener(eventName, cb));
      h[eventKey] = [];
    });
  }


}
