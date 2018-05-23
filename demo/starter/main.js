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

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>It works!</h1>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));