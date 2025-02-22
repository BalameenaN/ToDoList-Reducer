import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import initialState from './data'

function App() {

 const[state, dispatch] = useReducer(reducer,initialState);
 const[inputValue, setInputValue] = useState("");

 function reducer(state,action){
  console.log(action);
  
  switch(action.type){
    case "Toggle":
      const newArr = state.map((s)=> s.id === action.payload ? {...s, completed:!s.completed} : s);
     
      return newArr;
     
     case "Delete":
      const DeletedArr = state.filter((s)=>s.id !== action.payload);
      console.log(DeletedArr);
      return DeletedArr;
     
      case "Add":
        return [...state,{userId: state[0].userId, id: state.length+1, title:action.payload, completed: false }];
  }
      
  }
function addHandle(){
  if(inputValue.trim() != ""){
    dispatch({type:"Add", payload:inputValue})
  }
  setInputValue("");
}

function inputHandle(e){
  setInputValue(e.target.value);
}
  
 function toggleHandle(id){
   
  dispatch({type:"Toggle",payload:id});

 }

 function deleteHandle(id){

  dispatch({type:"Delete",payload:id})

 }

  const checkInput = state.map((i)=>{
   // console.log(i.title)
    return(
    <>
    <div className="button-container">
    <label>
    <input type="checkbox" checked={i.completed} onChange={()=>toggleHandle(i.id)}/>{i.title}</label>
    <div className='btn'>
    <button className='button' >Edit</button>
    <button className='button' onClick={()=>deleteHandle(i.id)}>Delete</button><br/>
    </div>
    </div>
    </>)
})

  return(
    <>
      <h1>ToDoList</h1>
      <div className='input-container'>
      <input className="input" type="text" placeholder="Enter the task" value={inputValue} onChange={inputHandle}/> 
      <button className="add" onClick={()=>addHandle()}>Add</button><br/>
      </div>
      <div className='list-container'>
      {checkInput}
      </div>
    </>
  )
 
}

export default App
