import React, {useState} from 'react'
import { Formik, Form} from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup'
import NavBar from './NavBar';
import '../App.css';

function Update({userList,onUpdate,onDelete}) {
  
  const [initialValues, setInitialValues] = useState({id:"", name:"", email:""})

  const validate = Yup.object({
    name: Yup.string().max(15, 'Must be 15 characters or less').required('Name is Required'),
    email: Yup.string().email('Email is invalid').required('Email is required')
   })
   
    const EditHandler = (obj) => {
      console.log(obj)
      setInitialValues({id:obj.id,name:obj.name,email:obj.email})
    }  

    const deleteHandler = (id) => {
      onDelete(id)
    }

    const onSubmit = (values,onSubmitProps) => {
      console.log(values)
      onUpdate(values.id,values.name,values.email)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
    }

 return (
  <>
  <NavBar/>
   <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
    {
      formik => {
       return <Form>
        <TextField label="Name" name="name" type="text" />
        <TextField label="Email" name="email" type="email" />
        <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </Form>
      }
    } 
   </Formik>
   <table className="table">
    <thead className="thead-dark">
     <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
     </tr>
    </thead>
    <tbody>
    {userList.map((obj, index) => {
      return (
     <tr key={index}>
      <td>{obj.id}</td>
      <td>{obj.name}</td>
      <td>{obj.email}</td>
      <td><button className="btn btn-primary" onClick={()=>EditHandler(obj)}>Edit</button></td>
      <td><button className="btn btn-primary" onClick={()=>deleteHandler(obj.id)} >Delete</button></td>
     </tr>
    )
  })  
  }
    </tbody>
   </table>
  </>
 );
}

export default Update;
