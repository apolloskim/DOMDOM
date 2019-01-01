import DOMDOMNodeCollection from './domdom_node_collection';

window.$l = arg => {
  if (typeof arg === "string") {
    let nodeListArr = document.querySelectorAll(arg);
    nodeListArr = Object.assign([], nodeListArr);
    return new DOMDOMNodeCollection(nodeListArr);
  } else if (typeof arg === 'object' && arg instanceof HTMLElement) {
    const htmlArr = [arg];
    return new DOMDOMNodeCollection(htmlArr);
  }
}
