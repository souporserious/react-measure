export default function getCloneDimensions(node) {
  const { parentNode } = node
  const context = document.createElement('div')
  const clone = node.cloneNode(true)
  let width = 0
  let height = 0

  // give the node some context to measure off of
  // height and overflow prevent scrollbars from node copy
  context.style.height = 0
  context.style.position = 'relative'
  context.style.overflow = 'hidden'

  // clean up any attributes that might cause a conflict
  clone.setAttribute('id', '')
  clone.setAttribute('name', '')

  // set props to hide copy and get a true height calculation
  clone.style.height = 'auto'
  clone.style.position = 'absolute'
  clone.style.visibility = 'hidden'

  // append copy to context
  context.appendChild(clone)

  // append context to DOM so we can measure
  parentNode.appendChild(context)

  // get accurate width and height
  width = clone.scrollWidth
  height = clone.scrollHeight

  // destroy clone
  parentNode.removeChild(context)

  return { width, height }
}
