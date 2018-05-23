// import React from 'react';
// import ReactDOM from 'react-dom';

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