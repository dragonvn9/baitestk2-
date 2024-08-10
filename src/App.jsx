
import { useEffect, useState } from 'react';
import './App.css';



function App() {

  function getStoredTodos () {
    let data = localStorage.getItem("listtodos")
    let json = JSON.parse(data)
    if (json) {
      return json
    }
    return []
  }


  const [toggle, setToggle] = useState(1);
  const [inputValue, setInputValue] = useState('')
  const [listtodos, setListtodos] = useState(getStoredTodos())

  useEffect (() => {
    localStorage.setItem("listtodos", JSON.stringify(listtodos))
  }, [listtodos])

  

  const Toggletab = (token)=> {
    setToggle(token);
  }

  const handleChange = (event) =>{
    let text = event.target.value
    setInputValue(text )

  }
  const handleAdd = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) { 
      alert('Vui Lòng Nhập Một Giá Trị');
      return;
    }
    let task = [...listtodos, { task: inputValue, completed: false }];
    setListtodos(task);
    setInputValue(''); 
  }

  const changeTaskStatus = (index) =>{
    const newListtodos = [...listtodos]
    newListtodos[index].completed = !newListtodos[index].completed
    setListtodos(newListtodos)
    // lúc này mảng listtodos mới sẽ giữ nguyên số lượng phần tử như trước khi cập nhật, 
    //nhưng chỉ thay đổi trạng thái completed của phần tử mà bạn đã nhấp vào.
  }

  //const listDeleted = listtodos.filter(todo => !todo.completed)

  const handleDelete = (taskToDelete) => {
    //console.log(taskToDelete)
    const indexToDelete = listtodos.findIndex(todo => todo.task === taskToDelete)
    //console.log(indexToDelete)
    if (indexToDelete === -1) return;
    const newListtodos = listtodos.filter((_, index) => index !== indexToDelete)
    setListtodos(newListtodos)
  }

  const handleDeleteAll = () => {
    const newListAfterDeleteAll = listtodos.filter(task => !task.completed)
    setListtodos(newListAfterDeleteAll)

  }


  return (
    <div className="App">
      <div className="todo-container">
        <div className="tabs-header">
          <div className={toggle ===1 ? "tab-active" : "tab"}  onClick={()=>Toggletab(1)}>All Todo List</div>
          <div className={toggle ===2 ? "tab-active" : "tab"} onClick={()=>Toggletab(2)}>Active</div>
          <div className={toggle ===3 ? "tab-active" : "tab"} onClick={()=>Toggletab(3)}>Completed</div>
        </div>

        <div className="form-input">
          <form>
            <input type="text" placeholder="Nhập tên công việc" value={inputValue} onChange ={handleChange}/>
            <button onClick={handleAdd} className='btn-add'>Add</button>
          </form>
        </div>


        <div className="tabs-content">
          <ul className={toggle ===1 ? "active-list" : "list"}> 
            {listtodos.map((todo, index) => (
              <li key = {index} className={todo.completed ? 'completed' : ''}>
                <i className={"h5 me-2 " + (todo.completed ? "bi bi-check-square" : "bi bi-square" )} 
                onClick={()=>changeTaskStatus(index)}></i>
                  {todo.task}
                
              </li>
            ))}

          </ul>
          <ul className={toggle ===2 ? "active-list" : "list"} >
            {listtodos.filter(todo => !todo.completed).map((todo, index) => ( 
                <li key={index}>
                  <i className={"h5 me-2 bi bi-square"}></i>
                  {todo.task}
                </li>
              ))}

          </ul>
          <ul className={toggle ===3 ? "active-list" : "list"}> 
            {listtodos.filter(todo => todo.completed).map((todo, index) => ( 
                <li key={index} className={todo.completed ? 'completed' : ''}>
                  <i className={"h5 me-2 bi bi-check-square"}></i>
                  {todo.task}
                  <i className="bi bi-trash" onClick={() =>handleDelete(todo.task)}></i>
                </li>
              ))}

          </ul>


        </div>
        <div className="delete-all">
          <button onClick={handleDeleteAll} className='btn-delete-All'> Delete All</button>
        </div>


      </div>

    
      
      



    </div>
  );
}

export default App;
