import React, {useState,useEffect} from 'react'
import '../App.css';
import NavBar from './NavBar';

function Update({userList,onUpdate,onDelete}) {

   const [data, setdata] = useState({id:"", name:"", email:""})
   const [errors, setErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
  
      const onChangeHandler = (e) => {
          const {name, value} = e.target
          setdata({...data, [name]:value})
      }
      
      const onClickHandler = (e) => {
        e.preventDefault();
        console.log(data)
        onUpdate(data.id,data.name,data.email)
        setErrors(validate(data))
        setIsSubmit(true);
        setTimeout(() => {
          setdata({id:"", name:"", email:""})
        },[2000])
      }
     
      useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
          console.log(data);
        }
      }, [errors]);

      const validate = (datas) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!datas.name) {
          errors.name = "Username is required!";
        }
        if (!datas.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(datas.email)) {
          errors.email = "This is not a valid email format!";
        }
        return errors;
      };
   
    const EditHandler = (obj) => {
       setdata(obj)
    }  

    const deleteHandler = (id) => {
      onDelete(id)
    }

 return (
  <>
  <NavBar/>
  <form>
    <div className="form-group">
      <label htmlFor="exampleInputName">Name</label>
      <input type="text"  className="form-control" name="name" placeholder="Enter name" value={data.name}  onChange={onChangeHandler} />
    </div>
    <p>{errors.name}</p>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" name="email" placeholder="Enter email" value={data.email}  onChange={onChangeHandler} />
    </div>
    <p>{errors.email}</p>
    <button type="submit" className="btn btn-primary" onClick={onClickHandler}>Submit</button>
   </form>
   <table className="table">
    <thead className="thead-light">
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
