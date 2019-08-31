import React, { Component } from 'react';
import './css/App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {

  // ToDoListをstateに定義、初期値はlocalStorageから取得または []
  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || []
  }

  // todoList itemの追加
  addTodo = (item, callBack) => {
    // todoList stateに追加
    this.setState(
      {
        todoList: this.state.todoList.concat(item)
      },
      () => {
        // localStorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack()
      }
    )
  }

  // todoListからitemを削除
  removeTodo = (item, callBack) => {
    this.setState(
      {
        todoList: this.state.todoList.filter(x => x !== item)
      },
      () => {
        // localStorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack()
      }
    )
  }

  render() {
    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            this.addTodo(
              {
                title: titleElement.value,
                description: descriptionElement.value
              },
              () => {
                // stateの変更後に入力した値を空にする
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
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
