import dataStore from './data-store'

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

  if(amount === 0) {
    return node.offsetHeight
  }

  const firstChild = children[0]
  const lastChild = children[amount-1]

  const { marginTop } = getStyle(firstChild)
  const { marginBottom } = getStyle(lastChild)

  const offsetDiff = (lastChild.offsetTop - firstChild.offsetTop)

  return (offsetDiff + lastChild.offsetHeight) + parseInt(marginTop) + parseInt(marginBottom)
}