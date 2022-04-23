import React, {useMemo } from 'react'
import { useTable } from 'react-table'
import NavBar from './NavBar';
import {Link} from 'react-router-dom'
import './table.css'

function List({userList,onDelete,onUpdate}) {
  
  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id"
    },
    {
      Header: "Title",
      accessor: "title"
    },
    {
      Header: "Body",
      accessor: "body"
    },
    {
      Header: "Edit",
      accessor: "edit",
        Cell: ({ cell }) => (
        <Link to={"/update"}><button className="btn btn-primary mt-3" onClick={() => onUpdate(cell.row.values)} >Edit</button></Link>
        )
    },
    {
      Header: "Delete",
      accessor: "delete",
        Cell: ({ cell }) => (
          <button className="btn btn-primary mt-3" onClick={() =>  {
            const confirmBox = window.confirm(
              "Do you really want to delete this Row?"
            )
            if (confirmBox === true) {
              onDelete(cell.row.values.id)
            }
          }} >Delete</button>
      )
    }
  ]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => userList, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })


  return (
    <>
    <NavBar/>
    <table {...getTableProps()}>
    <thead>
    {headerGroups.map(headerGroup => (
     <tr {...headerGroup.getHeaderGroupProps()}>
       {headerGroup.headers.map(column => (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
      ))}
     </tr>
    ))}
    </thead>
    <tbody  {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
   </table>
  </> 
 );
}

export default List;
