import React, { Component } from 'react';
import './css/App.css';
import ToDoListItem from "./ToDoListItem.js"

const initialForm = { title: '', description: '' };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      form: initialForm,
    }
  }

  resetForm = () => {
    this.setState({ ...this.state, form: initialForm });
  }

  setForm = (key, value) => {
    this.setState({ ...this.state, form: { ...this.state.form, [key]: value }});
  }

  // todoList itemの追加
  addTodo = e => {
    e.preventDefault();
    // todoList stateに追加
    this.setState({ todoList: [...this.state.todoList, this.state.form] }, this.resetForm());
  }

  // todoListからitemを削除
  removeTodo = (item) => {
    this.setState({ todoList: this.state.todoList.filter(x => x !== item) });
  }

  render() {
    const { title, description } = this.state.form;
    return (
      <div className="App">
        <form className="App-form">
          <div>
            <input
              id="title"
              placeholder="title"
              value={title}
              onChange={e => this.setForm('title', e.target.value)}
            />
            <textarea
              id="description"
              placeholder="description"
              value={description}
              onChange={e => this.setForm('description', e.target.value)}
            />
          </div>
          <div>
            <button onClick={e => this.addTodo(e)}>登録</button>
          </div>
        </form>
        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
        <p>クリックで消せるよ</p>
          {this.state.todoList.map(todo => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
              // クリックされたItemをtodoList stateから削除
              onClick={() => this.removeTodo(todo)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
