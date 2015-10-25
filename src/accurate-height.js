import dataStore from './data-store'

function getStyle(node) {
  return(
    dataStore(node, 'style') ||
    dataStore(node, 'style', getComputedStyle(node))
  )
}

export default function getHeight(el) {
  const { children } = el
  const firstChild = children[0]
  const lastChild = children[children.length-1]

  const { marginTop } = getStyle(firstChild)
  const { marginBottom } = getStyle(lastChild)

  const offsetDiff = (lastChild.offsetTop - firstChild.offsetTop)

  return (offsetDiff + lastChild.offsetHeight) + parseInt(marginTop) + parseInt(marginBottom)
}