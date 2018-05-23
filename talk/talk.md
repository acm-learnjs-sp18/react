# Learn.js React Talk

## What is React

From official website, it is called "A JavaScript library for building user interfaces" AKA "View library", could be used to create interactive UIs.

Declarative: clearer structure, and easier to debug. 

	+ State based, saves state in components, when state change, rerenders and updates the view  

Component Based: web page divided into different components

React Native: React for writing phone apps

Very commonly used:

+ Sites created with React:
  + NPM (very recently)
  + Airbnb
  + Dropbox
  + Uber
  + Lyft
  + Apple! (https://developer.apple.com/documentation)
  + Microsoft! (https://outlook.live.com/owa/)

Set



## Code Along

### Simple Function Component

```jsx
<div id="card"></div>

// import React from 'react';
// import ReactDOM from 'react-dom';

function Card() {
  return (
    <div>
      <h1>Can you see it & Can you feel it?</h1> // MUST use a special character as an example
    </div>
  );
}

ReactDOM.render(<Card></Card>, document.getElementById('card')) // EMPHASIZE this
```

### Simple Function Component with Property

```jsx
function Card(props) {
  return (
    <div>
      <img src={props.src}></img> {/* every tag in React must have a closing tag */}
      <h1>{props.text}</h1> {/* introduce interpolation */}
    </div>
  );
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" />
let card2 = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vue.svg/440px-Vue.svg.png" text="Vue" />

ReactDOM.render(card, document.getElementById('card'))
ReactDOM.render(card2, document.getElementById('card2'))
```

### Simple Function Component with Function Property

```jsx
function clickFunction() {
    console.log('Button clicked')
}

function Card(props) {
  return (
    <div>
      <img src={props.src}></img>
      <h1>{props.text}</h1>
      <button onClick={props.handleClick}>Click me</button>
    </div>
  );
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" handleClick={clickFunction} />

ReactDOM.render(card, document.getElementById('card'));
```

### Class Component

```jsx
let clickCount = 0;

function clickFunction() {
    clickCount++;
    console.log('Button clicked ' + clickCount + ' times');
}

class Card extends React.Component {
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.props.handleClick}>Click me</button>
            </div>
        );
    }
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" handleClick={clickFunction} />

ReactDOM.render(card, document.getElementById('card'));
```

### Class Component with State

```jsx
// Show the WRONG way first!

// WRONG WAY!
let clickCount = 0;

function clickFunction() {
    clickCount++;
    console.log('Button clicked ' + clickCount + ' times');
}

class Card extends React.Component {
    // rerender is not triggered! 
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.props.handleClick}>Click me</button>
              <p>I have clicked this button {this.props.clickCount} times</p>
              // It is NOT changing!!!
            </div>
        );
    }
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" clickCount={clickCount} handleClick={clickFunction} />

ReactDOM.render(card, document.getElementById('card'));
```

```jsx
// RIGHT way
class Card extends React.Component {
    constructor(props) {
        super(props); // remember to call super()
        // Initialize state here
        this.state = {
	    clickCount: 0,  
        };
    }
    
    handleClick = () => {
        this.setState({
            clickCount: this.state.clickCount + 1,
        }); // must use setState, to tell React to rerender
    };
    
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.handleClick}>Click me</button>
              <p>I have clicked this button {this.state.clickCount} times</p>
            </div>
        );
    }
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" /> // remember to remove clickFunction here in code along

ReactDOM.render(card, document.getElementById('card'));
```

### Use Another Component Inside This Component

```jsx
function CountDisplay(props) {
    return <p>I have clicked this button {props.clickCount} times</p>
}
class Card extends React.Component {
    constructor(props) {
        super(props); // remember to call super()
        // Initialize state here
        this.state = {
        	clickCount: 0,  
        };
    }
    
    handleClick = () => {
        this.setState({
            clickCount: this.state.clickCount + 1,
        }); // must use setState, to tell React to rerender
    };
    
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.handleClick}>Click me</button>
              <CountDisplay clickCount={this.state.clickCount} />
           	  // STRESS that React component MUST start with Capital Alphabet
            </div>
        );
    }
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" /> // remember to remove clickFunction here in code along

ReactDOM.render(card, document.getElementById('card'));
```

### Use Method to Fill

```jsx
class Card extends React.Component {
    constructor(props) {
        super(props); // remember to call super()
        // Initialize state here
        this.state = {
        	clickCount: 0,  
        };
    }
    
    handleClick = () => {
        this.setState({
            clickCount: this.state.clickCount + 1,
        }); // must use setState, to tell React to rerender
    };

    displayCount = (count) => {
		return <p>I have clicked this button {count} times</p>
    }
    
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.handleClick}>Click me</button>
	      {this.displayCount(this.state.clickCount)}
            </div>
        );
    }
}

let card = <Card src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" text="React" /> // remember to remove clickFunction here in code along

ReactDOM.render(card, document.getElementById('card'));
```

