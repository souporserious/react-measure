// inspired by https://github.com/julianshapiro/velocity/blob/master/velocity.js
const expando = 'react-measure' + (new Date().getTime())
const cache = {}
let uuid = 0

export default function dataStore(node, key, value) {
  if (value === undefined) {
    const id = node[expando]
    const store = id && cache[id]

    if (key === undefined) {
      return store
    } else if (store) {
      if (key in store) {
        return store[key]
      }
    }
  } else if (key !== undefined) {
    const id = node[expando] || (node[expando] = ++uuid)

    cache[id] = cache[id] || {}
    cache[id][key] = value

    return value
  }
}