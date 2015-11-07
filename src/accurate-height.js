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
  const amount = children.length

  // if no children present on the node we need to clone to get a true height
  if (amount === 0) {
    return getCloneHeight(node)
  }

  const firstChild = children[0]
  const lastChild = children[amount-1]

  const { marginTop } = getStyle(firstChild)
  const { marginBottom } = getStyle(lastChild)

  const offsetDiff = (lastChild.offsetTop - firstChild.offsetTop)

  return (
    parseInt(marginTop) +
    (offsetDiff + lastChild.offsetHeight) +
    parseInt(marginBottom)
  )
}