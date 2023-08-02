import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = ({showAlert}) => {
  
  const history = useNavigate();
  const [credential,setCredential] = useState({email:"",password:"",name:"",cpassword:""})
  const handleclick = async(e)=>{
      e.preventDefault();
      const {email,password,name,cpassword} = credential;
      if(cpassword!== password){
        showAlert("password and confirm password are shuld be same","danger")

      }else{
        const response = await fetch('https://inotebook-iyuq.onrender.com/api/auth/createuser',{
          method:'POST',
          headers:{
              'Content-type':'application/json'
          },
          body:JSON.stringify({email:email,password:password,name:name})
      })
      const json = await response.json()
    
      
      if(json.success){
        localStorage.setItem('token',json.authtoken);
        history("/")
        showAlert("successfully account created","success")
      }else{
        showAlert(json.error,'danger')
      }
    }
  }
  const onChange = (e) =>{
      setCredential({...credential,[e.target.name]:e.target.value})
      console.log(credential)
  }
  return (
    <div className="container">
      <form className='my-5' onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">username</label>
          <input type="text" className="form-control"   onChange={onChange} required minLength={5} value={credential.name}  name='name' />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} value={credential.email} required name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} required minLength={5} id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' value={credential.cpassword} onChange={onChange} required minLength={5} id="exampleInputPassword1" />
        </div>

        <div>

          <button type="submit" className="btn btn-primary" >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Singup