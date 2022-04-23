import React from 'react'
import { Formik, Form} from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup'
import NavBar from './NavBar';
import '../App.css';

function Add({onAdd}) {

   const initialValues={title: '', body: ''}

   const validate = Yup.object({
    title: Yup.string().min(5, 'Must be 5 characters or more').max(100, 'Must be 100 characters or less').required('Title is Required'),
    body: Yup.string().min(15, 'Must be 15 characters or more').max(500, 'Must be 150 characters or less').required('Body is required')
     })

   const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    const id = Math.random(Math.floor() * 100)
    onAdd(id,values.title,values.body)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    onSubmitProps.setStatus({
      sent: true,
      msg: "Data Added Successfull! Thanks!"
    })
  }

  return (
   <div>
   <NavBar/>
   <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
    {
      ({ status }) => (
        <Form>
        <TextField label="Title" name="title" type="text" />
        <TextField label="Body" name="body" type="text" />
        {status && status.msg && (
          <p className={`alert ${ status.sent ? "alert-success" : "alert-error"}`}>
            {status.msg}
          </p>
          )}
        <button className="btn btn-primary mt-3" type="submit">ADD</button>
        </Form>
     )}
   </Formik>
  </div>
 );
} 

export default Add;
