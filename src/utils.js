const body = document.body
const html = document.documentElement

export function isScrollElement(element) {
  try {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(element)
    return /(auto|scroll)/.test(overflow + overflowX + overflowY)
  } catch (e) {
    return false
  }
}

export function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element
  }
  return element.parentNode || element.host
}

export function getClosestScrollElement(element) {
  if (!element || element === body) {
    return window
  } else if (isScrollElement(element)) {
    return element
  } else {
    return getClosestScrollElement(getParentNode(element))
  }
}

export function getScrollDirection(axis, last, next) {
  if (next === last) {
    return null
  } else {
    return next - last > 0
      ? axis === 'x' ? 'right' : 'down'
      : axis === 'x' ? 'left' : 'up'
  }
}

export function getDocumentWidth() {
  return Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  )
}

export function getDocumentHeight() {
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
}

export function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollWidth: getDocumentWidth(),
    scrollHeight: getDocumentHeight(),
  }
}

export function getElementSize(node) {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight,
    scrollWidth: node.scrollWidth,
    scrollHeight: node.scrollHeight,
  }
}

export function getMeasurements(node) {
  const rect = node.getBoundingClientRect()
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight,
    scrollTop: node.scrollTop,
    scrollLeft: node.scrollLeft,
    scrollWidth: node.scrollWidth,
    scrollHeight: node.scrollHeight,
  }
}
