// @flow

type EntryContentRect = {
  x: number,
  y: number,
  top: number,
  right: number,
  bottom: number,
  left: number
};

export type Entry = {
  contentRect: EntryContentRect
};

type Rect = {
  top: number,
  left: number,
  width: number,
  height: number,
}

type Bounds = {
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
}

type Box = {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

export type ContentRect = {
  entry?: EntryContentRect,
  client?: Rect,
  offset?: Rect,
  scroll?: Rect,
  bounds?: Bounds,
  margin?: Box
}

function getContentRect(node: HTMLElement, types: string[]): ContentRect {
  const calculations = {}

  if (types.indexOf('client') > -1) {
    calculations.client = {
      top: node.clientTop,
      left: node.clientLeft,
      width: node.clientWidth,
      height: node.clientHeight,
    }
  }

  if (types.indexOf('offset') > -1) {
    calculations.offset = {
      top: node.offsetTop,
      left: node.offsetLeft,
      width: node.offsetWidth,
      height: node.offsetHeight,
    }
  }

  if (types.indexOf('scroll') > -1) {
    calculations.scroll = {
      top: node.scrollTop,
      left: node.scrollLeft,
      width: node.scrollWidth,
      height: node.scrollHeight,
    }
  }

  if (types.indexOf('bounds') > -1) {
    const rect = node.getBoundingClientRect()
    calculations.bounds = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
  }

  if (types.indexOf('margin') > -1) {
    const styles = getComputedStyle(node)
    calculations.margin = {
      top: parseInt(styles.marginTop),
      right: parseInt(styles.marginRight),
      bottom: parseInt(styles.marginBottom),
      left: parseInt(styles.marginLeft),
    }
  }

  return calculations
}

export default getContentRect
