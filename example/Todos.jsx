import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import { Motion, spring } from 'react-motion'
//import Measure from '../src/react-measure'

class Measure extends Component {
  static defaultProps = {
    config: {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
      //attributeOldValue: false,
      //characterDataOldValue: false,
      //attributeFilter: []
    }
  }

  state = {
    height: -1,
    dirty: false
  }

  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)
    this._observer = new MutationObserver(this._onMutation)
    this._observer.observe(this._node, this.props.config)
  }

  componentWillReceiveProps({children}) {
    //this._oldProps = this.props
    // if (this.props.children !== children) {
    //   this.setState({dirty: true})
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    this._observer.disconnect()
  }

  _onMutation = (mutations) => {
    this.props.onChange(this._node.offsetHeight)
    this.setState({dirty: true})
  }

  render() {
    const { children }  = this.props
    const { dirty, height} = this.state

    return children
  }
}

class Paragraph extends Component {
  state = {
    show: false
  }

  render() {
    const { show } = this.state

    return(
      <div>
        <h2>We happy?</h2>
        <p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.</p>
        <button onClick={() => this.setState({show: !show})}>
          Toggle Text
        </button>
        {
          show &&
          <div style={{margin: 24, background: 'orange'}}>
            <h2>Samuelception</h2>
            <p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.</p>
          </div>
        }
      </div>
    )
  }
}

class Paragraphs extends Component {
  state = {
    count: 1,
    height: -1
  }

  renderParagraphs() {
    let paragraphs = []

    for(let i = this.state.count; i--;) {
      paragraphs.push(<Paragraph key={i} />)
    }

    return paragraphs
  }

  render() {
    return(
      <div>
        <button
          onClick={() => this.setState({count: this.state.count+1})}
        >
          Add Paragraph
        </button>
        <Measure
          onChange={(height) => {
            console.log(height)
            this.setState({height})
          }}
        >
          {/*<Motion
            defaultStyle={{x: 0}}
            style={{x: spring(this.state.height)}}
          >
            {({x}) =>*/}
              <div
                className="paragraphs"
                style={{
               //   height: x,
                  background: 'red',
                  overflow: 'hidden'
                }}
              >
                {this.renderParagraphs()}
              </div>
            {/*}
          </Motion>*/}
        </Measure>
      </div>
    )
  }
}

class ToDo extends Component {
  constructor(props) {
    super(props);
    this._node = null;
  }
  
  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this);
    //console.log(this._node)
    this.props.node(this._node);
  }
  
  // componentDidUpdate(prevProps) {
  //   if(this.props.isEditing !== prevProps.isEditing) {
  //     this.props.node(this._node);
  //   }
  // }
  
  _handleEdit(e) {
    e.stopPropagation();
    this.props.onEdit();
  }
  
  _handleSave(e) {
    e.preventDefault();
    let value = ReactDOM.findDOMNode(this.refs.input).value;
    this.props.onSave('content', value);
  }
  
  _handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete();
  }
  
  render() {
    
    let { height, opacity } = this.props.currValue;
    
    let collapsedStyles = {
      opacity: opacity.val
    };
    
    let editingStyles = {
      opacity: 1 - opacity.val
    };
    
    return(
      <div
        data-id={this.props.id}
        className="todo"
        style={{
          //height: height.val
        }}
      >
        { !this.props.isEditing &&
          <div
            className="todo__inner"
            //style={collapsedStyles}
            onClick={this._handleEdit.bind(this)}
          >
            {this.props.content}
          </div>
        }
        { this.props.isEditing &&
          <form
            className="todo__inner"
            //style={editingStyles}
            onSubmit={this._handleSave.bind(this)}
          >
            <div><strong>Todo Item:</strong></div>
            <input ref="input" defaultValue={this.props.content} />
            <button>Save</button>
          </form>
        }
        <div
          className="todo__delete"
          onClick={this._handleDelete.bind(this)}
        >
          Delete
        </div>
      </div>
    );
  }
}

class Todos extends Component {
  
  constructor() {
    super();
    this.state = {
      todos: [],
      editing: false
    }
    this._input = null
  }
  
  _handleSubmit(e) {
    e.preventDefault()
    this._create()
  }
  
  _create() {
    let todo = {
      id: Date.now(),
      content: this._input.value,
      isEditing: false
    }

    this.setState({todos: [todo].concat(this.state.todos)}, () => {
      this._input.value = ''
      this._input.focus()
    })
  }
  
  _edit(id) {
    
    let { todos } = this.state;
    let todo = todos.filter(t => t.id == id)[0];
    let isEditing = todo === this.state.editing ? false : todo;

    todo.isEditing = isEditing ? true : false;
    
    this.setState({todos, editing: isEditing});
  }
  
  _save(id, key, value) {
    let { todos } = this.state;
    let todo = todos.filter(t => t.id == id)[0];
    
    todo[key] = value;
    todo.isEditing = false;
    
    this.setState({todos, editing: false});
  }
  
  _delete(id) {
    let { todos } = this.state;
    
    for(var i = todos.length; i--;) {
      if(todos[i].id == id) { 
        todos.splice(i, 1);
        break;
      }
    }
    
    this.setState({todos, editing: false});
  }
  
  _getEndValues() {
    const { todos } = this.state;
    let configs = {};
    
    todos.forEach(todo => {    
      configs[todo.id] = {
        height: 1,
        opacity: spring(todo.isEditing ? 0 : 1),
        todo
      };
    });
    
    return configs;
  }
  
  _willEnter(key, value, endValue, currentValue, currentSpeed) {    
    return {
      height: spring(0),
      opacity: spring(0),
      todo: endValue[key].todo
    };
  }
  
  _willLeave(key, value, endValue, currentValue, currentSpeed) {
    return {
      height: spring(0),
      opacity: spring(0),
      todo: currentValue[key].todo
    };
  }
  
  _handleTodoNode(node) {
  }
  
  render() {
    return(
      <div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input ref={(c) => this._input = ReactDOM.findDOMNode(c)} type="text" />
          <button>Add Item</button>
        </form>
        <Motion
          style={this._getEndValues()}
          willEnter={this._willEnter.bind(this)}
          willLeave={this._willLeave.bind(this)}
        >
          {currValues =>
            <div className="todos">
              {Object.keys(currValues).map(key => {
                
                let currValue = currValues[key];
                let todo = currValue.todo;
                
                return(
                  <ToDo
                    key={key}
                    id={key}
                    isEditing={todo.isEditing}
                    onEdit={this._edit.bind(this, key)}
                    onSave={this._save.bind(this, key)}
                    onDelete={this._delete.bind(this, key)}
                    content={todo.content}
                    currValue={currValue}
                    node={this._handleTodoNode.bind(this)}
                  />
                );
              })}
            </div>
          }
        </Motion>
        <Paragraphs />
      </div>
    );
  }
}

export default Todos