import faker from 'faker'

function generateFakeData(callback, size = 100) {
  const data = []
  for (let i = 0; i < size; i++) {
    data.push(callback(faker))
  }
  return data
}

export default generateFakeData
