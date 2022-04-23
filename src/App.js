import React, {useState, useEffect} from 'react'
import './App.css';
import Add from './components/Add';
import List from './components/List';
import Update from './components/Update';
import Axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  const [table, setTable] = useState([])
  const [value, setValue] = useState()

  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      console.log(res)
      setTable([...table,...res.data])
    })
  },[])

  const onAdd = (id,title,body) => {

  Axios.post(`https://jsonplaceholder.typicode.com/posts`, { 
       id,
       title,
       body
     }).then((res) => {
       console.log(res)
      setTable([...table,res.data])
     })   
  }

  const onUpdate = (id,title,body) => {
    Axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
       id,
       title,
       body
     }).then((res) => {
       let newIndex = table.findIndex((ind) => ind.id === id)
       table[newIndex] = {id:id, title:title, body:body}
       setTable(table)
     })   
  }

  const onUpdateData = (data) => {
    setValue(data)
  }

  const onDelete = (id) => {
      Axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setTable(table.filter((obj) => obj.id !== id ))
      })
  }
  
  return (
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Add onAdd={onAdd} />} /><Route/>
            <Route exact path='/list' element={<List userList={table} onDelete={onDelete} onUpdate={onUpdateData}/>} /><Route/>
            <Route exact path='/update' element={<Update onUpdate={onUpdate} value={value} />} /><Route/>
          </Routes>
        </BrowserRouter>
        </div>
  );
}

export default App;