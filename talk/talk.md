# Learn.js React Talk

## What is React

From official website, "A JavaScript library for building user interfaces"

+ code with clearer structure
+ easier to debug
+ run fast!

Core Idea:

+ Components
  + reusable parts of webpage, such as a Post on Facebook
  + "renders" to page: draw onto the webpage

+ State:
  + Data stored in components
  + when state changes, component "rerenders": draws again based on data changes

Very commonly used:

+ Sites created with React:
  + NPM (very recently)
  + Airbnb
  + Dropbox
  + Uber
  + Lyft
  + Apple! (https://developer.apple.com/documentation)
  + Microsoft! (https://outlook.live.com/owa/)



## Code Along

Link: [https://tinyurl.com/learnjs-react-1](https://tinyurl.com/learnjs-react-1)

### Simple Function Component

Simplest form of React Component is a function component.

You can use components as if you are writing HTML tags, using JSX tags (compiles to JS, looks like HTML tags)

```jsx
<div id="app"></div>

// import React from 'react';
// import ReactDOM from 'react-dom';

// React IMG link:  https://tinyurl.com/acmreactimg
// Vue IMG link: https://tinyurl.com/acmvueimg

function Card() {
  return (
    <div>
      <h1>It works!</h1>
    </div>
  );
}

ReactDOM.render(<Card></Card>, document.getElementById('app')) // EMPHASIZE this
```

Notice that EVERY single JSX tags need a closing tag, even if in HTML they are empty elements (with empty body), such as `<img></img>`. 

Since this is tiring, React offers a shorthand `<img />` if you have an empty body.

We can add an image to the card to make it looks more like a card. Notice I have to wrap them inside of a `<div/>`, since every React Component MUST only return a single Element (you can have many children of this element though):

```jsx
function Card() {
  return (
    <div>
      <img src="https://tinyurl.com/acmreactimg" />
      <h1>It works!</h1>
    </div>
  );
}
```

To add some pre-baked styling , we add a class to the `<div />` using the `className` attribute

```jsx
<div className="card"></div>
```

### Simple Function Component with Property

We said that component "is a reusable part of webpage". However, we are hard coding our URL into the component. What if we want to show an image with Vue? Usually this means you want to "pass down" different URL from outside to different `<Card />` instances. How can we do that?

In HTML tags, you have something called an "attribute", like `<img src="">`. In JSX tags, we can use similar structure. We can add a "fake attribute" `src=""` to our tag. Such action is called passing down a "property" name `src` to `<Card />`, feels like arguments to a function. To access this `src` from the card, we need to add a new argument called `props` to `Card`. Through `props.src`, we can access the property we pass down.

Another problem that immediately comes is that: how can I put this `props.src` to `src` of `img`? If I try to put it between ""s, it won't work: it will set the `src` of `img` to `"props.src"`, a non-existance URL with no images there!

Instead, we will introduce a new concept called "Interpolation". Replace the ""s with {}. This tells React: please interpret this `props.src` as a JS expression! In this case, it correctly translates to the URL. And now we have our nice image shown.

Similarly, we can change the text of the card too, using interpolation. Let's create a property called `text`. And we will pass a string "React" down to it.

```jsx
function Card(props) {
  return (
    <div>
      <img src={props.src}></img>
      <h1>{props.text}</h1>
    </div>
  );
}

ReactDOM.render(<Card src="https://tinyurl.com/acmreactimg" text="React" />, document.getElementById('app'))
```

Let's add a new feature to our card: "Likes". We will create a button for it. Let's first make sure it is working: I will create a function called `likes` that prints out `Button clicked` in the console.

```jsx
function likes() {
    console.log('Button clicked')
}

function Card(props) {
  return (
    <div>
      <img src={props.src}></img>
      <h1>{props.text}</h1>
      <button onClick={likes}>Like</button>
    </div>
  );
}

ReactDOM.render(<Card src="https://tinyurl.com/acmreactimg" text="React" />, document.getElementById('app'))
```

We know it is working. We want to store the information about how many likes we are collecting: basically how many times this "Like" button is clicked. To do this, for NOW, let's create a variable outside of the Card component named `likeCount`:

```jsx
let likeCount = 0;
function likes() {
    likeCount++;
    console.log('Button clicked: ' + likeCount + ' times')
}
```

### Class Component with State

Obviously we want to display like count to the page instead in the console. Coming part is very important:

I will first try to do a WRONG way:

```jsx
let likeCount = 0;
function likes() {
    likeCount++;
    console.log('Button clicked: ' + likeCount + ' times')
}
function Card(props) {
  return (
    <div>
      <img src={props.src}></img>
      <h1>{props.text}</h1>
      <button onClick={likes}>Like</button>
      <p>You clicked the button {likeCount} times</p> // To actually render {} as string, try {"{}"}
    </div>
  );
}

ReactDOM.render(<Card src="https://tinyurl.com/acmreactimg" text="React" />, document.getElementById('app'))
```

Notice it is NOT updating, even if in console it is changing!

The reason to this is that for React Components, they must rely on `state` to achieve the result. Keep in mind: state is the data related to component, stored inside of component; whenever state updates, the component "rerenders" (redraws) itself. Therefore, we need to move `likeCount` as a part of the state.

To add state to the component, we MUST first convert it to a class instead of a function. It extends from `React.Component`.

We first need to modify the `props`. Since we no longer have a `props` parameter, we will instead access it from `this.props`. This `this` is similar to the `this` you learn in C++, referencing the class itself.

We also have to wrap our code in a class method called `render`. 

After migrating to a class, we can start add a state. Add a constructor to this class by `constructor`. Inside of it, we must FIRST call `super()`, which is the base class' constructor, similar to C++. After that, we create a property of this class called `this.state`, which we initialize as `{ clickCount: 0 }`. Notice it should be an object.

After this, we need to change the `{ likeCount }` to `{ this.state.likeCount }`.

Let's also get rid of the old `likeCount` and `likes`, and instead declare a class method `handleLike`. For some reason, when you want to customize your own methods, rather then the stardard React ones like `render`, you need to use arrow functions: `() => {}` to make it work.

To update state, BE CAREFUL: we cannot directly modify the state. Remember the core part of our change is to ensure that when changing state, we want the component to "rerender", basically calling the `render` method again to update page view. Simply changing a field in object does not naturally provide this functionality. To empower this, we will use a special React builtin: `this.setState`. It takes a single parameter, which is an object that tells which PART of the state to update, essentially REPLACING that part.

```jsx
class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            likeCount: 0
        };
    }
    handleLike = () => {
        this.setState({
            likeCount: this.state.likeCount + 1
        });
    };
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.handleLike}>Like</button>
              <p>You clicked the button {this.state.likeCount} times</p> // To actually render {} as string, try {"{}"}
            </div>
        );
    }
}

ReactDOM.render(<Card src="https://tinyurl.com/acmreactimg" text="React" />, document.getElementById('app'))
```

Notice that now clicking the button updates the like count and displays correctly.

Finally, let's wrap our code along by actually reusing the Card component, putting 2 card components under a new component called App.

```jsx
class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            likeCount: 0
        };
    }
    handleLike = () => {
        this.setState({
            likeCount: this.state.likeCount + 1
        });
    };
    render() {
        return (
            <div>
              <img src={this.props.src}></img>
              <h1>{this.props.text}</h1>
              <button onClick={this.handleLike}>Like</button>
              <p>You clicked the button {this.state.likeCount} times</p> // To actually render {} as string, try {"{}"}
            </div>
        );
    }
}

function App() {
    return (
        <div>
            <Card src="https://tinyurl.com/acmreactimg" text="React" />
            <Card src="https://tinyurl.com/acmvueimg" text="Vue" />
        </div>
    );
}

ReactDOM.render(<Card src="https://tinyurl.com/acmreactimg" text="React" />, document.getElementById('app'))
```

Something to notice that now if I click the button for React Card, only the like for React is increasing, while not affecting the Vue Card. This is also another reason why we want to put state inside component: having different states for different instances of components.
