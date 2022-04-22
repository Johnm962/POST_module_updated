import React, {useState, useEffect} from 'react'
import './App.css';
import Add from './components/Add';
import List from './components/List';
import Update from './components/Update';
import Axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  const [table, setTable] = useState([])

 useEffect(() => {
  Axios.get("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    setTable([...table,...res.data])
  })
 },[])

 const onAdd = (name,email) => {
     const id = Math.random(Math.floor() * 100)
     Axios.post(`https://jsonplaceholder.typicode.com/users`, {
       id,
       name,
       email
     }).then((res) => {
      setTable([...table,res.data])
     })   
  }

  const onUpdate = (id,name,email) => {
    Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
       id,
       name,
       email
     }).then((res) => {
       let newIndex = table.findIndex((ind) => ind.id === id)
       table[newIndex] = {id:id, name:name, email:email}
       setTable(table)
     })   
  }

  const onDelete = (id) => {
      Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setTable(table.filter((obj) => obj.id !== id ))
      })
  }
  
  return (
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Add onAdd={onAdd} />} /><Route/>
            <Route exact path='/list' element={<List userList={table}  />} /><Route/>
            <Route exact path='/update' element={<Update userList={table} onDelete={onDelete} onUpdate={onUpdate} />} /><Route/>
          </Routes>
        </BrowserRouter>
        </div>
  );
}

export default App;