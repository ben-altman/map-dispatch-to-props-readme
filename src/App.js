import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addTodo } from './actions/todo';

class App extends Component {

  state = {
    todo: ''
  }

  addTodo = () => {
    return ({
      type: 'ADD_TODO',
      todo: this.state.todo
    })
  }

  handleOnChange = event => {
    this.setState({
      todo: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    console.log("Todo being added: ", this.state.todo);
    this.props.addTodo(this.state.todo); //Code Change: using our action creator method instead of passing in action directly.
    this.setState({ todo: '' });
  }

  render() {
    // debugger;
    const renderTodos = () => this.props.todos.map(todo => <li key={todo}>{todo}</li>);
    return (
      <div className="App">
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <input
          type="text"
          onChange={(event) => this.handleOnChange(event)}
          id="todos"
          placeholder="add todo" 
          value={this.state.todo}/>
        <input type="submit" />
      </form>
      <h2>Todos:</h2>
        <ol>{renderTodos()}</ol>
      </div>
    );
  }
};

// const mapStateToProps = (state) => {
//   return {
//     todos: state.todos
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addTodo: (todo) => {
//       dispatch(addTodo(todo))
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default connect(mapStateToProps, { addTodo })(App); // code change: no mapDispatchToProps required

export default connect(state => ({ todos: state.todoes }), { addTodo })(App);