import accurateHeight from './accurate-height'

export default function getNodeDimensions(node, accurate = false) {
  const rect = node.getBoundingClientRect()

  return {
    width: rect.width,
    height: accurate ? accurateHeight(node) : rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
  }
}
