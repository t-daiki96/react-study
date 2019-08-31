import React, { Component } from 'react';
import './css/App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {

  // ToDoListをstateに定義、初期値は []
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit() {
      const obj = document.getElementById("App-form");
      obj.preventDefault();

      // idがtitleのElementを取得
      const titleElement = obj.target.elements["title"];
      // idがdescriptionのElementを取得
      const descriptionElement = obj.target.elements["description"];

      // todoList stateに追加
      this.setState(
        {
            todoList: this.state.todoList.concat({
            title: titleElement.value,
            description: descriptionElement.value
          })
        },
        // stateの変更後に入力した値を空にする
        () => {
          titleElement.value = "";
          descriptionElement.value = "";
        }
      )
  }
  render() {
    return (
      <div className="App">
        <form
          id="App-form"
          className="App-form"
          onSubmit={this.formSubmit}
        >
          <div>
            <input
              id="title"
              placeholder="title"
            />
            <textarea
              id="description"
              placeholder="description"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              登録
            </button>
          </div>
        </form>
        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
          {this.state.todoList.map(todo => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
              // クリックされたItemをtodoList stateから削除
              onClick={() => {
                this.setState({
                  todoList: this.state.todoList.filter(x => x !== todo)
                })
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
