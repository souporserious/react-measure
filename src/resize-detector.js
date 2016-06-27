import elementResizeDetectorMaker from 'element-resize-detector'

let instance = null

export default function resizeDetector() {
  if (!instance) {
    instance = elementResizeDetectorMaker({
      strategy: `scroll`
    })
  }
  return instance
}
