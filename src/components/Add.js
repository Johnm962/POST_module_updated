import React from 'react'
import { Formik, Form} from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup'
import NavBar from './NavBar';
import '../App.css';

function Add({onAdd}) {

   const initialValues={name: '', email: ''}

   const validate = Yup.object({
      name: Yup.string().max(15, 'Must be 15 characters or less').required('Name is Required'),
      email: Yup.string().email('Email is invalid').required('Email is required')
     })

   const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    onAdd(values.name,values.email)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  return (
   <div>
   <NavBar/>
   <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
    {
      formik => {
        return  <Form>
        <TextField label="Name" name="name" type="text" />
        <TextField label="Email" name="email" type="email" />
        <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </Form>
      }
    }
   </Formik>
  </div>
 );
}

export default Add;
