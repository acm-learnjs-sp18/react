# Learn.JS React Demo: Simple Todo List

## How Does it Look like

![screenshot](https://i.imgur.com/T8IjXX2.png)

## Warning

The following tutorial MAY require some background knowledge with JavaScript, ES6 and HTML. I would try my best to explain, but if there is still some parts unclear, GOOGLE them! (I should usually give out the technical terms that you could search for). On the other hand, official tutorial is always your best friend! Check out https://reactjs.org and read its tutorial too if you are really interested!

## The Code

1. To have the page up and served, install `SimpleHTTPServer` for python:

   ```bash
   pip install SimpleHTTPServer
   ```

   and, (on Mac) navigate to the `starter` folder, by opening up the terminal, type `cd ` followed by a space, and drag the folder to the terminal. Type "Enter". Then type:

   ```bash
   python -m SimpleHTTPServer
   ```

   This will open up a simple HTTP server at `localhost:8000`. Enter this address to your browser to view the result. You should see a page saying "It works!".

   (Alternatively, directly edit on this [pen on Codepen.io](https://codepen.io/kevinkassimo/pen/gzZEjz). Fork it and start editing yourself!)

   Starter: [https://tinyurl.com/learnjs-react-starter](https://tinyurl.com/learnjs-react-starter)

   Final: [https://tinyurl.com/learnjs-react-final](https://tinyurl.com/learnjs-react-final)

   

   Start by going to `main.js` in the `starter` folder . There, you should see the following code:

   ```jsx
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
   ```

   What it does is to create a React component using ES6 class. In the `constructor()` , we are supposed to call `super()` (constructor of `React.Component`). The `render()` method is where we should put our true rendering logic inside. Notice we can use JSX (JS with HTML tag-like structures) in React, thus you would notice we have `<div>` tags there. The very last line tells React to create this app onto an DOM element with id `app` (you can find it in a `<div>` in `index.html`)

2. Let us get to the work. Inside `TodoApp`'s constructor, there is a `this.state`, which is used in React to save states relevant to the current component. We want to store our data representation of `todo` items inside, thus we modify the code to initialize them as empty array.

   ```jsx
   constructor() {
   	super();
   	this.state = {
   		todos: [],
   	};
   }
   ```

3. A core mindset of React is to break down large stuff to small components. From the screenshot above, we know we would love to separate Todo entries and specially create a component for it to render. Thus, let us add the following code (already implemented in boilerplate):

   ```jsx
   function TodoItem({ body, date }) {
     return (
         <div className="todo__item">
           <span>{date}</span>
           <span className="todo__item-body">{body}</span>
         </div>
     );
   }
   
   /* alternatively
   function TodoItem(props) {
     return (
         <div className="todo__item">
           <span>{props.date}</span>
           <span className="todo__item-body">{props.body}</span>
         </div>
     );
   }
   */
   ```

   Notice that when we have no need to save `state` mentioned before (certain components are only used to "present" stuff, rather than implementing logic (in React, we sometimes call them "dumb components")), we can declare them simply as a function. This function takes in an argument `props`, which is the property passed down to this component. Here, we used ES6's object destructuring `{ prop1, prop2 }` to get the `props.body` `props.date`  to respective variables, so we do not need to repeat `props.` prefix when later using them.

   Our `TodoItem` takes in 2 properties: `body` as the main body text, `date` as the date this item is added (string format). 

   In the part we provide HTML-like code as our return data, you would notice `<span>{date}</span>` . This `{data}` pattern is called __interpolation__, which basically means that data plugged inside of the curly braces would be evaluated as normal JavaScript, and its result would be set as the content of the tag. It basically means:

   ```jsx
   let text = "hello";
   <span>{text}</span> /* means <span>hello</span> */
   ```

   Another thing to keep in mind is that React, on mentioning DOM events or elements, usually follows the JS DOM API instead of the HTML ways. For example, we are using `className` to set class of `<div>` , instead of the HTML's `class` . This also occurs later when we try to use DOM events such as `onClick`, `onChange` , instead of their HTML counterparts, `onclick`, `onchange`.

4. Good. Now we have our presentation model of todo items mostly done. If we now have some todo data stored in state of `TodoApp` , how can we pass them to this `TodoItem`? Notice we mentioned about the parameter `props` used to pass properties down to `TodoItem` . Therefore, the following code creates a `TodoItem` with `body` set to `TEST` and `date` to `5/23/2018` :

   ```jsx
   <TodoItem body="TEST" date="5/23/2018"></TodoItem>
   // Alternative shorthand if the content is empty:
   <TodoItem body="TEST" date="5/23/2018" />
   ```

   We are treating `TodoItem` as if it is a DOM tag, and passing properties as if they are DOM attributes! This is why the React JSX is truly magic!

   Suppose we have the state of `TodoApp` to be:

   ```jsx
   this.state = {
       todos: [
           {body: '1', date: '1/1/2018'},
           {body: '2', date: '1/2/2018'},
       ]
   };
   ```

   We can create a list of `TodoItem` s using the following code:

   ```jsx
   let todoItems = [];
   for (let i = 0; i < this.state.todos.length; i++) {
       let todo = this.state.todos[i];
       todoItems.push(<TodoItem key={i} body={todo.body} date={todos.date} />);
   }
   ```

   (We put a `key` onto the `TodoItem`, which is used to make React update more performant. It could be ignored for now, but ignoring it would result in warnings popping up in the console.)

   This would basically generate the following HTML code when rendered (suppose we have the todo data mentioned above):

   ```html
   <!--
   suppose todos are [{body: '1', date: '1/1/2018'}]
   We escaped '/'s in HTML to &#47;
   -->
   
   <div class="todo__item">
   	<span>1</span>
   	<span class="todo__item-body">1&#47;1&#47;2018</span>
   </div>
   <div class="todo__item">
   	<span>2</span>
   	<span class="todo__item-body">1&#47;2&#47;2018</span>
   </div>
   ```

   We can wrap our logic of rendering these todo items to the following method on `TodoApp`:

   ```jsx
   createEntries() {
   	for (let i = 0; i < this.state.todos.length; i++) {
           let todo = this.state.todos[i];
           todoItems.push(<TodoItem key={i} body={todo.body} date={todos.date} />);
       }
   
       return (
         <div className="todo__entries">
           {entries}
         </div>
       );
   }
   ```

   …and we call it in `render()` by interpolation to make it actually rendered in DOM:

   ```jsx
   render() {
       return (
         <div>
         	<div>
               <h1>NONO's Todo List</h1>
               {this.createEntries()}
   		</div>
         </div>
       );
   }
   ```

5. Okay, so our app now can statically display todo items in the state. The problem is: how can we now add or remove todo items? A naive way of thought is "Okay, we can just directly modify `this.state` of `TodoApp`!" __NO__! Such behavior would __NOT__ work with React.

   A basic idea about React is: whenever the `state` of the component changes, its `render()` would be __called__, so as to update rendered results. However, directly changing the `state` object does NOT notify React that rerender is needed. Thus, React offers a special method called `setState()` . It takes either a function (argument is the previous state) or an object as its parameter. In them, we tell React how should we update __part__ of state (we only need to specify the part we want to change).

   With this knowledge, let's declare `addTodo` and `removeTodo` so that they could be used later for adding and removing todos:

   ```jsx
   // NOTICE that we are using () => {}, ES6 arrow functions here. We do so such that `this` used inside would not be lost when detaching this method from component and pass it to child components. We will come back to this later on again.
   addTodo = (text) => {
       // Immutability Helper is a better solution
       // https://github.com/kolodny/immutability-helper
       let newTodos = this.state.todos.slice();
       newTodos.push({ body: text, date: getDateString() });
       this.setState({
         todos: newTodos
       });
   };
   
   removeTodo = (index) => {
       let newTodos = this.state.todos.slice();
       newTodos.splice(index, 1);
       this.setState({
         todos: newTodos
       });
   };
   ```

   Good news: we have done (mostly) our part on `TodoApp` Component!

6. For above screenshot, you should notice that we add new Todo Items through an input box, and remove existing items through the button attached to the end of each single entry.

   Let's start with removing an item first. How can the `TodoItem` we declared before triggers a change of the `TodoApp` component that wraps around it? The solution: since we can pass data (body, date) down as `props`, we can also pass functions down as props, and call them inside of the child component!

   To achieve this, let's modify our `TodoItem` a little bit:

   First, we change the params (object structuring) to the following, basically allowing access an extra property called `remove`:

   ```jsx
   function TodoItem({ body, date, remove }) { /*...*/ }
   ```

   Inside, we add a `<button>` after the two `<span>`s, and set its `onClick` event to `remove`:

   ```jsx
   <button onClick={remove}>Remove</button>
   ```

   This basically means: call the function `remove`, from `props` , that is passed down from parent, whenever someone clicks the button. Notice that `onClick` takes a function in React (following the JS DOM way) instead of statements (HTML way).

   In `createEntries` of`TodoApp`, we pass down `removeTodo(index)` as the `remove` property to `TodoItems`:

   ```jsx
   <TodoItem
   	key={index}
   	body={todo.body}
   	date={todo.date}
   	remove={() => this.removeTodo(index)}
   />
   ```

   Notice that `this.removeTodo(index)`returns a function, as we defined before. The reason of declaring a function that returns a function is that it allows us to attach the `index` data onto the function when accessing it from the child. Otherwise, we have pass an extra property simply specifying index to remove to the child `TodoItem`.

   (As for why we are using ES6 arrow functions, JavaScript has a quirky behavior that, whenever we pass a method on an object/class to something else, unless `this` is specially bind, otherwise it would be lost forever: feels like pulling down a sticker from your belongings (e.g. your laptop), unless specially writing down on it "this sticker belongs to BLAH", its owner data is forever lost. It becomes a problem when we need to call `this.setState(...)` in the method: if we lost `this`, which `state` are we updating? On the other hand, arrow function as a nice behavior of AUTOMATICALLY binding `this` on the environment it is created, thus we are using it here to avoid trouble.

   I know this may still sound confusing. I totally understand. It confuses me for one whole year before I figured out the reason. I am reluctant to explain it here as I know it will definitely confuse the reader. Sadly, this is a common problem in React, that understanding what happened is a must. So I tried my best. For further reading, I suggest https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a ).

   

7. We have implemented the removing feature. Now comes the last piece of the puzzle: implement Add Feature.

   To get started, let us create a component `TextInput`, which is a wrapper for the input. This time, instead of first explaining our goals and ideas, let me present the code first, and see if, with current knowledge, you could understand what it is doing:

   ```jsx
   class TextInput extends React.Component {
     constructor() {
       super();
       this.state = {
         text: '',
       }
     }
   
     // ES6 arrow function does the trick!
     updateText = (event) => {
       const text = event.target.value;
       this.setState({
         text, // this is an ES6 shorthand for text: text (a prop named "text" with var text as its value)
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
   ```

   Can you understand the code? First, we show `this.props.title` as a title above the input box. Since React always encourage saving states in `this.state`, we save the text inside `<input>` as `this.state.text`. To attach it to the value of `<input>`, we set `value={this.state.text}`. Whenever the input changes, we have `onChange` linked with `updateText()`, which sets `this.state.text` to the new input value. Eventually, user clicks `Submit` button, which calls `submitText`, that clears the current `this.state.text`, and calls `this.props.save`, the function passed down from the wrapping component to update its state. This `onChange` operation on `<input>` is understandable, but seems counter-intuitive when actually writing code, right? Agreed, but this also demonstrates React's idea of "state first": every core data related to the component should be delegated to the `this.state`, and every DOM element only serves as its presentation and event triggerer.

   You might ask: this looks like a deadlock, as `value` is set to the current `this.state.text`, while in `this.updateText` we are accessing the `event.target.value`, which is still the current value due to explicit setting before, even if user types a new character! Unfortunately, it works. This is related to the `state` update we mentioned before: when `state` is changed, `render` is called to render DOM results. Now, it a user types a new character, the DOM element would first receive the input and triggers `onClick`. The `event.target.value` has already changed on the DOM side, which has yet to notify React side, since `setState` has not been called yet! Eventually, we call `setState` in `updateText`, updating the state, triggering rerender, with the new character, thus would render the new character in the resulting DOM view. It is a common React practice and it fits React's philosophy. (There is also a DOM way of doing the same thing, using refs, but is usually discouraged, thus I would not explain here).

   Eventually, we plug our `TextInput` to the `render` of `TodoApp`, with `addTodo` we declared before passed down as the `save` property:

   ```jsx
   render() {
       return (
         <div>
           <div>
             <h1>NONO's Todo List</h1>
             {this.createEntries()}
             <TextInput title="Add Todo:" save={this.addTodo}/>
           </div>
         </div>
       );
   }
   ```

   

   Done! Here is our nice Todo List App!

   > But wait! I see some difference from the `final` version from the tutorial here!

    You are correct! The remaining parts of the example adds a name field to the Todo List, so that we change the title from `NONO's Todo List` to, for example, `Prof. Eggert's Todo List`; besides, I also added a secret (not really) "annoying" feature to the Todo List. However, they are not related to the core part of the Todo List App, and I would leave them as bonus functionalities for you guys to explore (practice reading React code and predict what the code implementing them are doing).

   The final version is available in the `final` folder. Alternatively, you can go to [this pen on Codepen.IO](https://codepen.io/kevinkassimo/pen/MGZxqg) to  see the result.

## Further Example

[Official Tic Tac Toe Tutorial](https://reactjs.org/tutorial/tutorial.html)