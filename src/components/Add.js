import React,{useState, useEffect} from 'react'
import NavBar from './NavBar';

function Add({onAdd}) {
   const [values, setValues] = useState({name:"", email:""})
   const [errors, setErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
   }

   const onClickHandler = (e) => {
     e.preventDefault();
     console.log(values)
     onAdd(values.name,values.email)
     setErrors(validate(values))
     setIsSubmit(true);
     setTimeout(() => {
      setValues({id:"", name:"", email:""})
    },[2000])  
   }
 
   useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);

    const validate = (value) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!value.name) {
        errors.name = "Username is required!";
      }
      if (!value.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(value.email)) {
        errors.email = "This is not a valid email format!";
      }
      return errors;
    };

  return (
   <>
   <NavBar/>
   <form>
    <div className="form-group">
      <label htmlFor="exampleInputName">Name</label>
      <input type="text"  className="form-control" placeholder="Enter name" name="name" value={values.name}  onChange={onChangeHandler} />
    </div>
    <p>{errors.name}</p>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" placeholder="Enter email" name="email" value={values.email}  onChange={onChangeHandler} />
    </div>
    <p>{errors.email}</p>
    <button type="submit" className="btn btn-primary" onClick={onClickHandler}>Submit</button>
   </form>
  </>
 );
}

export default Add;
