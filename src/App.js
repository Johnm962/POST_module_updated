import React, {useState, useEffect} from 'react'
import './App.css';
import Add from './components/Add';
import List from './components/List';
import Update from './components/Update';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  const [table, setTable] = useState([])

 useEffect(() => {
  getData();
 },[])

 const getData = async() => {
  await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => {
        setTable(res)
 })
}

 const onAdd = async (name,email) => {
    const id = Math.floor(Math.random() * 100)
    console.log(id)
    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        id:id,
        name:name,
        email:email,
      }),
      headers: {
        "Content-type": "application/json; charset: UTF-8",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setTable([...table,data])
    });
  
  }

  const onUpdate = (id,name,email) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id:id,
        name:name,
        email:email,
      }),
      headers: {
        "Content-type": "application/json; charset: UTF-8",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setTable([...table,data])
    });
  }

  const onDelete = async(id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE'
      })
      .then((res) => {
        setTable(table.filter((obj) => obj.id !== id ))
      })
  }
  

  console.log(table)
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