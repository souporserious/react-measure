export default function getNodeDimensions(node, clone = false) {
  if(clone) {
    // set width/height to auto to get a true calculation
    node.style.width = 'auto'
    node.style.height = 'auto'

    // move node exactly on top of it's clone to calculate proper position
    // this also overrides any transform already set, so something like scale
    // won't affect the calculation, could be bad to do this,
    // but we'll see what happens
    node.style.transform = 'translateY(-100%)'
    node.style.WebkitTransform = 'translateY(-100%)'
  }

  const rect = node.getBoundingClientRect()

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
  }
}