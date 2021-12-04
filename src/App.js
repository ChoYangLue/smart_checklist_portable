import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.statusList = ["TODO", "PROG", "DONE", "SKIP"];

    this.state = {
      todo: [
       { title: 'JavaScript覚える', status: "TODO", isEdit: false, inputRef: React.createRef() } ,
       { title: 'jQuery覚える', status: "TODO", isEdit: false, inputRef: React.createRef() } ,
       { title: 'ES2015覚える', status: "TODO", isEdit: false, inputRef: React.createRef() } ,
       { title: 'React覚える', status: "TODO", isEdit: false, inputRef: React.createRef() }
      ]
    };
    this.addTodo = this.addTodo.bind(this);
    this.addTodoInputRef = React.createRef();
  }

  // 画面Update
  componentDidUpdate() {
    this.state.todo.map( (todo, i) => {
      if (todo.isEdit) {
        // 編集状態ならフォーカスを合わせる
        todo.inputRef.current.focus();
        return;
      }
    });

  }

  // 新規追加
  addTodo() {
    console.log("add todo");

    // 何も入力されていなかったらリターン
    if (!this.addTodoInputRef.current.value) return;

    // 追加
    this.state.todo.push({
      title: this.addTodoInputRef.current.value,
      status: this.statusList[0],
      inputRef: React.createRef()
    });

    this.setState({
      todo : this.state.todo
    });
    
    this.addTodoInputRef.current.value='';
  }
 
  // 削除機能
  deleteTodo(i) {
    console.log("delete todo");
    
    this.state.todo.splice(i, 1);

    this.setState({
      todo : this.state.todo
    });
  }

  // 編集
  changeTodoTitle(i) {
    console.log("edit start");
    this.state.todo[i].isEdit = true;

    this.state.todo[i].inputRef.current.value = this.state.todo[i].title;
    this.state.todo[i].inputRef.current.focus();
    this.setState({
      todo : this.state.todo
    });
  }

  // フォーカスが外れたため編集終了
  onBlurTitleEdit(i) {
    console.log("edit end by blur");
    this.state.todo[i].isEdit = false;

    this.setState({
      todo : this.state.todo
    });
  }

  // Enterキーが押されたため編集終了
  onKeyPressTitleEdit(i, e) {
    console.log("edit end by enter");
    if (e.key == 'Enter') {
      e.preventDefault();
      
      this.state.todo[i].isEdit = false;

      this.setState({
        todo : this.state.todo
      });
    }
  }

  changeTodoStatus(i) {
    this.state.todo[i].status = this.getNextStatus(this.state.todo[i].status);
    
    console.log("change status:"+this.state.todo[i].status);

    this.setState({
      todo : this.state.todo
    });
  }

  getNextStatus(preStatus) {
    var preIndex = this.statusList.indexOf(preStatus);

    if (preIndex + 1 >= this.statusList.length) {
      return this.statusList[0];
    }

    return this.statusList[preIndex + 1];
  }

  handleOnChange(e) {
    this.addTodoInputRef.current.value = e.target.value;
  }

  handleOnChangeEdit(i, e) {
    this.state.todo[i].title = e.target.value;

    this.setState({
      todo : this.state.todo
    });
  }
 
  render() {
    return (
      <div lassName="App">
        <header className="App-header">

        <h1>SmartChecklistPortable</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.addTodo();
          }}>
          <input type="text" ref={this.addTodoInputRef} onChange={(e) => this.handleOnChange(e)} />
          <input type="submit" value="追加" onSubmit={this.addTodo} />
        </form>

        <ul>
          {this.state.todo.map( (todo, i) => {
            return <li key={i} >
            <input type="button" value={todo.status} onClick={() => this.changeTodoStatus(i)}/>
            <span onClick={() => this.changeTodoTitle(i)} hidden={todo.isEdit}>{todo.title}</span>
            <input type="text" ref={todo.inputRef} onChange={(e) => this.handleOnChangeEdit(i, e)} value={todo.title} hidden={!todo.isEdit} onBlur={() => this.onBlurTitleEdit(i)} onKeyPress={(e) => this.onKeyPressTitleEdit(i, e)}/>
            <input type="button" value="☓" onClick={() => this.deleteTodo(i)}/> 
            </li>
          })}
        </ul>

        </header>

      </div>
    );
  }
}

export default App;