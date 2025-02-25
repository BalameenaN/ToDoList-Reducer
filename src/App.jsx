import { useState, useReducer } from 'react'
import './App.css'
import initialState from './data'

//reducer function
function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case "Toggle":
      const newArr = state.map((s) => s.id === action.payload ? { ...s, completed: !s.completed } : s);
      return newArr;

    case "Delete":
      const DeletedArr = state.filter((s) => s.id !== action.payload);
      //console.log(DeletedArr);
      return DeletedArr;

    case "Add":
      return [{ userId: state[0].userId, id: state.length + 1, title: action.payload, completed: false }, ...state];
    
    case "Edit": 
      const newState = state.map((s) => s.id === action.payload.id ? { ...s, title: action.payload.title } : s);
      return newState;
  }

  console.log(state);

}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null)

  const checkInput = state.map((i) => {
    // console.log(i.title)
    return (
      <>
      { i.id === editId ? (<div className="button-container">
         
            <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
          <div className='btn'>
            <button className='button' onClick={saveHandle}>Save</button>
            <button className='button' onClick={cancelHandle}>Cancel</button><br />
          </div>
        </div> ) :  (<div className="button-container">
          <label>
            <input type="checkbox" checked={i.completed} onChange={() => toggleHandle(i.id)} />{i.title}</label>
          <div className='btn'>
            <button className='button' onClick={()=>editHandle(i.id,i.title)}>Edit</button>
            <button  disabled={i.completed ? false : true} className={i.completed ? 'button' : 'button-disabled'} onClick={() => deleteHandle(i.id)}>Delete</button><br />
          </div>
        </div>)}
       
      </>)
  })

  function addHandle() {
    if (inputValue.trim() != "") {
      dispatch({ type: "Add", payload: inputValue })
    }
    setInputValue("");
  }

  function inputHandle(e) {
    setInputValue(e.target.value);
  }

  function toggleHandle(id) {

    dispatch({ type: "Toggle", payload: id });

  }

  function deleteHandle(id) {

    dispatch({ type: "Delete", payload: id })

  }
  function editHandle(id,value){
    setEditId(id);
    setEditValue(value);

  }

function saveHandle(){
  dispatch({type:"Edit",payload:{id: editId, title: editValue}});
  setEditId(null);
  setEditValue("");
 
}
function cancelHandle(){
  setEditId(null);
  setEditValue("");
}

  return (
  
    <>
      <h1>ToDoList</h1>
      <div className='input-container'>
        <input className="input" type="text" placeholder="Enter the task" value={inputValue} onChange={inputHandle} />
        <button className="add" onClick={() => addHandle()}>Add</button><br />
      </div>
      <div className='list-container'>
        {checkInput}
      </div>
    </>
  )

}

export default App
