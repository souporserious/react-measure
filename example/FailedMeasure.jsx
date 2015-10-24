class Measure extends Component {
  state = {
    height: -1,
    dirty: true
  }

  componentDidMount() {
    const childNode = ReactDOM.findDOMNode(this.refs['child'])
    const height = childNode.offsetHeight

    this.setState({
      height,
      dirty: false
    }, () => {
      this.props.onChange(height)
      this._lastHeight = height
    })
  }

  componentWillReceiveProps({children}) {
    if (this.props.children !== children) {
      this.setState({dirty: true})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidUpdate() {
    const { dirty } = this.state

    if (dirty) {
      const childNode = ReactDOM.findDOMNode(this.refs['child'])
      
      // set the child's height to auto so we can get a true measurement
      childNode.style.height = 'auto'
      
      const height = childNode.offsetHeight

      if (height > 0 && height !== this._lastHeight) {
        this.setState({
          height,
          dirty: false
        }, () => {
          this.props.onChange(height)
          this._lastHeight = height
        })
      } else {
        this.setState({dirty: false})
      }
    }
  }

  render() {
    const { children }  = this.props
    const { dirty, height} = this.state
    
    if (!dirty) {
      return React.cloneElement(children, { ref: 'child' })
    }

    return(
      <div
        ref="wrapper"
        style={{height, overflow: 'hidden'}}
      >
        {
          React.cloneElement(children, {
            ref: 'child'
          })
        } 
      </div>
    )
  }
}