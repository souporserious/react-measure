// @flow

const types = ['client', 'offset', 'scroll', 'bounds', 'margin']

export default function getTypes(props: Object) {
  const allowedTypes = []
  types.forEach(type => {
    if (props[type]) {
      allowedTypes.push(type)
    }
  })
  return allowedTypes
}
