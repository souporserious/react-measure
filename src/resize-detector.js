import createResizeDetector from 'element-resize-detector'

let instance = null

export default function resizeDetector() {
  if (!instance) {
    instance = createResizeDetector({
      strategy: `scroll`
    })
  }
  return instance
}
