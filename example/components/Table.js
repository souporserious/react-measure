import React, { Component, Children, Fragment, cloneElement } from 'react'
import { physics, tween, transform, value } from 'popmotion'
import scroll from 'stylefire/scroll'

import generateFakeData from '../generate-fake-data'

import { Measure, Viewport } from '../../src/index'

class Cell extends Component {
  state = {
    isEditing: false,
  }
  render() {
    const { isEditing } = this.state
    return (
      <div
        onClick={() =>
          this.setState({
            isEditing: !isEditing,
          })
        }
      >
        {isEditing
          ? 'This is a long string to show how column width should update'
          : this.props.children}
      </div>
    )
  }
}

const columns = [
  {
    name: '',
    accessor: 'avatar',
    render: src => (
      <img
        src={src}
        alt={src}
        width={32}
        height={32}
        style={{ display: 'block' }}
      />
    ),
  },
  {
    name: 'Company',
    accessor: 'company',
    render: data => <Cell>{data}</Cell>,
  },
  {
    name: 'First Name',
    accessor: 'firstName',
    render: data => <Cell>{data}</Cell>,
  },
  {
    name: 'Last Name',
    accessor: 'lastName',
    render: data => <Cell>{data}</Cell>,
  },
  {
    name: 'Phone Number',
    accessor: 'phoneNumber',
  },
  {
    name: 'Email',
    accessor: 'email',
  },
  {
    name: 'Address',
    accessor: 'address',
  },
  {
    name: 'Donations',
    accessor: 'donations',
  },
  {
    name: 'Total',
    accessor: 'total',
  },
]

const data = generateFakeData(
  faker => ({
    id: faker.random.uuid(),
    company: faker.company.companyName(),
    avatar: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    donations: faker.random.number(),
    total: faker.finance.amount(),
  }),
  50
)

let stickyProp = null
if (window.CSS && window.CSS.supports) {
  if (window.CSS.supports('position', 'sticky')) {
    stickyProp = 'sticky'
  } else if (window.CSS.supports('position', '-webkit-sticky')) {
    stickyProp = '-webkit-sticky'
  }
}

const leftScrollShadow = transform.interpolate([0, 0.15], [0, 1])
const rightScrollShadow = transform.interpolate([0.85, 1], [1, 0])

function Shadow({ position, progress }) {
  const scrollProgress = isNaN(progress) ? 0 : progress
  const style = {
    width: 4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 20,
    pointerEvents: 'none',
    opacity:
      position === 'left'
        ? leftScrollShadow(scrollProgress)
        : rightScrollShadow(scrollProgress),
  }

  if (position === 'left') {
    style.left = 0
    style.background = 'linear-gradient(90deg, rgba(0,0,0,0.15), transparent)'
  } else {
    style.right = 0
    style.background = 'linear-gradient(90deg, transparent, rgba(0,0,0,0.15))'
  }

  return <div aria-hidden style={style} />
}

class AnimateScroll extends Component {
  componentDidMount() {
    if (!this.scroller) {
      this.scroller = scroll()
    }
  }

  setRef = node => {
    if (!this.scroller) {
      this.scroller = scroll(node)
    }
  }

  setScroll = (side, amount) => {
    tween({
      from: this.scroller.get(side),
      to: amount,
      duration: 200,
    }).start(value => this.scroller.set(side, value))
  }

  setScrollX = amount => {
    this.setScroll('left', amount)
  }

  setScrollY = amount => {
    this.setScroll('top', amount)
  }

  moveScroll = (side, amount) => {
    this.setScroll(side, this.scroller.get(side) + amount)
  }

  moveScrollX = amount => {
    this.moveScroll('left', amount)
  }

  moveScrollY = amount => {
    this.moveScroll('top', amount)
  }

  render() {
    return this.props.children({
      bind: {
        ref: this.setRef,
      },
      moveScrollX: this.moveScrollX,
      moveScrollY: this.moveScrollY,
      setScrollX: this.setScrollX,
      setScrollY: this.setScrollY,
    })
  }
}

class TableBase extends Component {
  composeRefs = (...fns) => {
    if (!this.refsFunc) {
      this.refsFunc = node => fns.forEach(fn => fn(node))
    }
    return this.refsFunc
  }

  render() {
    const { columnWidths, rowWidth, header, body } = this.props
    return (
      <AnimateScroll>
        {animateScroll => (
          <Viewport>
            {({ bind, scrollX, width }) => {
              const canScroll = rowWidth > width
              const progress = canScroll ? scrollX / (rowWidth - width) : null
              const getWidthToScroll = oppositeSide => {
                const scrollAmount = oppositeSide ? scrollX + width : scrollX
                let totalWidth = 0
                let widthToScroll = 0
                columnWidths.some((columnWidth, index) => {
                  totalWidth += columnWidth
                  if (totalWidth >= scrollAmount) {
                    widthToScroll = oppositeSide
                      ? totalWidth
                      : totalWidth - columnWidth
                    return true
                  }
                })
                return oppositeSide
                  ? widthToScroll - width + 1
                  : widthToScroll - 1
              }

              return (
                <div
                  role="grid"
                  aria-readonly="true"
                  style={{
                    width: '100%',
                    position: 'relative',
                    border: '1px solid orange',
                  }}
                >
                  <div
                    role="presentation"
                    style={{
                      position: stickyProp,
                      top: 0,
                      zIndex: 5,
                      overflow: 'hidden',
                      backgroundColor: 'white',
                    }}
                  >
                    <button
                      style={{
                        fontSize: '32px',
                        position: 'absolute',
                        left: 0,
                        zIndex: 10,
                        opacity: progress <= 0 ? 0 : 1,
                        transform: `translateX(${progress <= 0 ? -100 : 0}%)`,
                        transition: 'all 180ms ease-out',
                        userSelect: 'none',
                      }}
                      disabled={progress <= 0}
                      onMouseDown={() => {
                        clearInterval(this.interval)
                        clearTimeout(this.scrollTimeout)
                        this.scrollTimeout = setTimeout(() => {
                          animateScroll.moveScrollX(-100)
                          this.interval = setInterval(() => {
                            animateScroll.moveScrollX(-100)
                          }, 60)
                        }, 120)
                      }}
                      onMouseUp={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                        animateScroll.setScrollX(getWidthToScroll() - 30)
                      }}
                      onTouchStart={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                        animateScroll.setScrollX(getWidthToScroll() - 30)
                      }}
                      onTouchEnd={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                      }}
                    >
                      ‹
                    </button>
                    <button
                      style={{
                        fontSize: '32px',
                        position: 'absolute',
                        right: 0,
                        zIndex: 10,
                        opacity: progress >= 0.99 || progress === null ? 0 : 1,
                        transform: `translateX(${
                          progress >= 0.99 || progress === null ? 100 : 0
                        }%)`,
                        transition: 'all 180ms ease-out',
                        userSelect: 'none',
                      }}
                      disabled={progress >= 0.99}
                      onMouseDown={() => {
                        clearInterval(this.interval)
                        clearTimeout(this.scrollTimeout)
                        this.scrollTimeout = setTimeout(() => {
                          animateScroll.moveScrollX(100)
                          this.interval = setInterval(() => {
                            animateScroll.moveScrollX(100)
                          }, 60)
                        }, 120)
                      }}
                      onMouseUp={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                        animateScroll.setScrollX(getWidthToScroll(true) + 30)
                      }}
                      onMouseLeave={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                      }}
                      onTouchStart={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                        animateScroll.setScrollX(getWidthToScroll(true) + 30)
                      }}
                      onTouchEnd={() => {
                        clearTimeout(this.scrollTimeout)
                        clearInterval(this.interval)
                      }}
                    >
                      ›
                    </button>
                    <div
                      role="row"
                      style={{
                        display: 'flex',
                        minWidth: rowWidth,
                        borderBottom: '1px solid orange',
                        transform: `translateX(${-scrollX}px)`,
                        willChange: 'transform',
                      }}
                    >
                      {header}
                    </div>
                  </div>
                  <div
                    role="presentation"
                    style={{
                      overflowX: 'auto',
                      WebkitOverflowScrolling: 'touch',
                    }}
                    ref={this.composeRefs(bind.ref, animateScroll.bind.ref)}
                  >
                    {body}
                  </div>
                  {canScroll && (
                    <React.Fragment>
                      <Shadow position="left" progress={progress} />
                      <Shadow position="right" progress={progress} />
                    </React.Fragment>
                  )}
                </div>
              )
            }}
          </Viewport>
        )}
      </AnimateScroll>
    )
  }
}

class Table extends Component {
  render() {
    const { columns, data } = this.props
    return (
      <Measure>
        {({ bind, measurements }) => {
          const measurementsKeys = Object.keys(measurements)
          let maxColumnWidths = []
          let rowWidth = null

          if (measurementsKeys.length) {
            let columnWidths = []
            measurementsKeys.forEach(key => {
              const [rowIndex, columnIndex] = key.split('-')
              const measurement = measurements[key]
              if (!columnWidths[columnIndex]) {
                columnWidths[columnIndex] = []
              }
              columnWidths[columnIndex].push(measurement.width)
            })
            maxColumnWidths = columnWidths.map(rowWidths =>
              Math.max(...rowWidths)
            )
            rowWidth = maxColumnWidths.reduce(
              (previousWidth, columnWidth) => previousWidth + columnWidth,
              0
            )
          }
          return (
            <TableBase
              columnWidths={maxColumnWidths}
              rowWidth={rowWidth}
              header={columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  role="columnheader"
                  style={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: maxColumnWidths[columnIndex],
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div {...bind(`0-${columnIndex}`)} style={{ padding: 12 }}>
                    {column.name}
                  </div>
                </div>
              ))}
              body={Object.keys(data).map((key, rowIndex) => {
                const row = data[key]
                return (
                  <div
                    key={key}
                    role="row"
                    style={{
                      display: 'flex',
                      minWidth: rowWidth,
                      borderTop:
                        rowIndex === 0 ? undefined : '1px solid orange',
                    }}
                  >
                    {columns.map((column, columnIndex) => {
                      const rowData = row[column.accessor]
                      return (
                        <div
                          key={columnIndex}
                          role="gridcell"
                          style={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 0,
                            flexShrink: 0,
                            width: maxColumnWidths[columnIndex],
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <div
                            {...bind(`${rowIndex + 1}-${columnIndex}`)}
                            style={{ padding: 12 }}
                          >
                            {column.render ? column.render(rowData) : rowData}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            />
          )
        }}
      </Measure>
    )
  }
}

class TableExample extends Component {
  state = {
    filterColumns: 'firstName email',
  }
  render() {
    const { filterColumns } = this.state
    return (
      <div style={{ padding: 32, border: '1px solid orange' }}>
        <input
          type="text"
          placeholder="Filter columns by accessor"
          onChange={e => this.setState({ filterColumns: e.target.value })}
          value={filterColumns}
        />
        <Table
          columns={columns.filter(
            column => filterColumns.indexOf(column.accessor) === -1
          )}
          data={data}
        />
      </div>
    )
  }
}

export default TableExample
