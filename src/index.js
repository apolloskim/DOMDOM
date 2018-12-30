
window.$l = arg => {
  if (typeof arg === "string") {
    let nodeListArr = document.querySelectorAll(arg);
    nodeListArr = Object.assign([], nodeListArr);
    return nodeListArr;
  }
}
