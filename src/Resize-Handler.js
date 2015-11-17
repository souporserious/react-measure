import debounce from 'lodash.debounce'

class ResizeHandler {
  constructor() {
    this._queue = []
    this.update = debounce(this.update.bind(this), 150)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.update)
    }
  }

  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.update)
    }
  }

  add(component) {
    this._queue.push(component)
  }

  remove(component) {
    const pos = this._queue.indexOf(component)
    if (pos > -1) {
      this._queue.splice(pos, 1)
    }    
  }

  update() {
    for (let i = this._queue.length; i--;) {
      this._queue[i]._measure()
    }
  }
}

export default ResizeHandler
