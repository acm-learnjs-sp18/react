// import React from 'react';
// import ReactDOM from 'react-dom';

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

class TodoAdder extends React.Component {
  render() {
    return <TextInput title="Add Todo:" {...this.props} />
  }
}

class NameChanger extends React.Component {
  render() {
    return <TextInput title="Change your name:" {...this.props} />
  }
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
    this.setState(prevState => {
      const newTodos = prevState.todos.slice();
      newTodos.push({ body: text, date: new Date().toLocaleDateString() });
      return {
        todos: newTodos,
      };
    })
  };

  // Notice: a function that returns another function
  removeTodo = index => () => {
    this.setState(prevState => {
      const newTodos = prevState.todos.slice();
      newTodos.splice(index, 1);
      return {
        todos: newTodos,
      };
    })
  };

  createEntries() {
    // we can use for loop too
    const entries = this.state.todos.map((todo, index) => {
      return (
        <TodoItem
          key={index}
          body={todo.body}
          date={todo.date}
          remove={this.removeTodo(index)}
        />
      );
    });

    return (
      <div className="todo__entries">
        {entries}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={this.state.shouldAnnoy ? 'annoying' : ''}>
          <h1>{this.state.name}'s Todo List</h1>
          {this.createEntries()}
          <NameChanger save={(name) => this.setState({ name })}/>
          <TodoAdder save={this.addTodo}/>
        </div>
        <button onClick={() => this.setState({ shouldAnnoy: !this.state.shouldAnnoy })}>What the heck?</button>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));
