import React, { useRef, useState , useContext} from 'react'
import { Link,useLocation, useNavigate, } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

const Navbar = ({showAlert}) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {notes} = context
  const Ref = useRef();
  let location = useLocation();
  const [data,setData] = useState({})
  const handleclick = () =>{
    console.log("click")
    Ref.current.click()
  }
  const getuser = async () =>{
    const response = await fetch(`https://inotebook-iyuq.onrender.com/api/auth/getuser`,{
      method:'POST',
      headers:{
        'Content-type':"application/json",
        'auth-token':localStorage.getItem('token')
      },
  
    })
    const json = await response.json();
    setData(json)
  }
    if(localStorage.getItem("token")){
      getuser()
    }else
    console.log(data)
   const handlelogout = ()=>{
     Ref.current.click()
     localStorage.removeItem("token")
     showAlert("logout successfully","success")
     navigate("/login")
   }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>INoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==="/about"? "active":""}`} to="/about">About</Link>
        </li>
      
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex justify-content-between" role="search">

        <Link className="btn btn-primary mx-2" to={'/login'}>Login</Link>
        <Link className="btn btn-primary mx-2" to={'/singup'}>Singup</Link>

      </form>:
      <>
      <i className="fas fa-user text-white me-3" onClick={handleclick}></i>
<button type="button" className="btn btn-primary d-none" ref={Ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">User Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <h4>{data.name}</h4>
        <h6>{data.email}</h6>
        <h6>Total notes:{notes.length}</h6>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-danger" onClick={handlelogout}>Log out</button>

      </div>
    </div>
  </div>
</div>
      </>
      }
    </div>
  </div>
</nav>
  )
}

export default Navbar