import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
 
const Login = ({showAlert}) => {
    const history = useNavigate();
    const [credential,setCredential] = useState({email:"",password:""})
    const handleclick = async(e)=>{
        e.preventDefault();
        const response = await fetch('https://inotebook-iyuq.onrender.com/api/auth/login',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({email:credential.email,password:credential.password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/")
          showAlert("successfully account login","success")

        }else{
          showAlert(json.error,"danger")
            
        }
    }
    const onChange = (e) =>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-5">
            <form className='my-5' onSubmit={handleclick}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credential.email} onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={credential.password} onChange={onChange} name='password' id="exampleInputPassword1"/>
  </div>

  <div>

  <button type="submit" className="btn btn-primary" >Submit</button>
  </div>
</form>
    </div>
  )
}

export default Login