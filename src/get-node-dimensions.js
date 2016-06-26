import getCloneDimensions from './get-clone-dimensions'

export default function getNodeDimensions(node, accurate = false) {
  const rect = node.getBoundingClientRect()
  let width = rect.width
  let height = rect.height

  if (accurate) {
    const cloneDimensions = getCloneDimensions(node)
    width = cloneDimensions.width
    height = cloneDimensions.height
  }

  return {
    width,
    height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
  }
}
