import dataStore from './data-store'
import getCloneHeight from './get-clone-height'

function getStyle(node) {
  return(
    dataStore(node, 'style') ||
    dataStore(node, 'style', getComputedStyle(node))
  )
}

// inspired by http://stackoverflow.com/a/8235013/1461204
export default function accurateHeight(node) {
  const { children } = node

  // if no children present on the node or an SVG element
  // we need to clone it to get a true height
  if (!children || (children && children.length === 0) || node instanceof SVGElement) {
    return getCloneHeight(node)
  }

  const firstChild = children[0]
  const lastChild = children[children.length-1]

  const { marginTop } = getStyle(firstChild)
  const { marginBottom } = getStyle(lastChild)

  const offsetDiff = (lastChild.offsetTop - firstChild.offsetTop)

  return (
    parseInt(marginTop) +
    (offsetDiff + lastChild.offsetHeight) +
    parseInt(marginBottom)
  )
}
