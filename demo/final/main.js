// import React from 'react';
// import ReactDOM from 'react-dom';

/* BEGIN Boilerplate
 *
 * <TodoItem body="body" date="dateString" remove={ removeFunc } />
 * <TextInput title="title" save={ saveFunc } />
 *
 * For the logic of implementing this component, check out README.md
 */

function TodoItem({ body, date, remove }) {
  return (
    <div className="todo__item">
      <span>{date}</span>
      <span className="todo__item-body">{body}</span>
      <button onClick={remove}>Remove</button>
    </div>
  );
}

class TextInput extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    }
    // this.updateText.bind(this);
    // Bind this, see https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a
  }

  // ES6 arrow function does the trick!
  updateText = (event) => {
    const text = event.target.value;
    this.setState({
      text,
    });
  };

  submitText = () => {
    this.props.save(this.state.text);
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <div className="todo__input-container">
        <p>{this.props.title}</p>
        <input
          type="text"
          value={this.state.text}
          onChange={this.updateText}
        />
        <button onClick={this.submitText}>Submit</button>
      </div>
    )
  }
}

function getDateString() {
  return new Date().toLocaleDateString();
}
/* END Boilerplate
 */

function TodoAdder(props) {
  return <TextInput title="Add Todo:" save={props.save} />
}

function NameChanger(props) {
  return <TextInput title="Change your name:" save={props.save} />
}

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Kevin',
      todos: [],
      shouldAnnoy: false,
    };
  }

  addTodo = (text) => {
    // Immutability Helper is a better solution
    // https://github.com/kolodny/immutability-helper
    let newTodos = this.state.todos.slice();
    newTodos.push({ body: text, date: getDateString() });
    this.setState({
      todos: newTodos
    });
  };

  // Notice: a function that returns another function
  removeTodo = (index) => {
    let newTodos = this.state.todos.slice();
    newTodos.splice(index, 1);
    this.setState({
      todos: newTodos
    });
  };

  changeName = (newName) => {
    this.setState({
      name: newName
    });
  };

  createEntries() {
    let entries = [];
    for (let i = 0; i < this.state.todos.length; i++) {
      let todo = this.state.todos[i];
      entries.push(
        <TodoItem
          key={i}
          body={todo.body}
          date={todo.date}
          remove={() => this.removeTodo(i)}
        />
      );
    }

    return (
      <div className="todo__entries">
        {entries}
      </div>
    );
  }

  toggleAnnoy = () => {
    this.setState({
      shouldAnnoy: !this.state.shouldAnnoy
    });
  };

  render() {
    return (
      <div>
        <div className={this.state.shouldAnnoy ? 'annoying' : ''}>
          <h1>{this.state.name}'s Todo List</h1>
          {this.createEntries()}
          <NameChanger save={this.changeName}/>
          <TodoAdder save={this.addTodo}/>
        </div>
        <button onClick={this.toggleAnnoy}>What the heck?</button>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));
