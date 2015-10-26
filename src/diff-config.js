const CONFIG_SHAPE = [
  'childList',
  'attributes',
  'characterData',
  'subtree',
  'attributeOldValue',
  'characterDataOldValue',
  'attributeFilter'
]

export default function diffConfig(prev, next) {
  for (let i = 7; i--;) {
    const config = CONFIG_SHAPE[i]
    const prevConfig = prev[config]
    const nextConfig = next[config]

    // if equal continue to the next
    if(prevConfig === nextConfig) {
      continue
    }

    const prevUndefined = (typeof prevConfig === 'undefined')
    const nextUndefined = (typeof nextConfig === 'undefined')

    // if attributeFilter, we know it needs to be a simple array,
    // so comparing lengths should be enough to know if it has changed
    if((prevUndefined && !nextUndefined) ||
       (!prevUndefined && nextUndefined) ||
       (config === 'attributeFilter' &&
        prevConfig.length !== nextConfig.length)) {
      return true
    }
  }
  return false
}