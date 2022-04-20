import React from 'react'
import NavBar from './NavBar';

function List({userList}) {
  console.log(userList)
  return (
    <>
    <NavBar/>
    <table className="table">
    <thead className="thead-light">
     <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
     </tr>
    </thead>
    <tbody>
      {userList.map((obj, index) => {
        return (
          <tr key={index}>
            <td>{obj.id}</td>
            <td>{obj.name}</td>
            <td>{obj.email}</td>
          </tr>
        )
      })}
     
    </tbody>
   </table>
  </> 
 );
}

export default List;
