import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
    const context = useContext(noteContext);
    const {notes,getNote,editnote} = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const history = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("token")){
        getNote()

      }else{
        history("/login")
      }
        // eslint-disable-next-line 
    },[])
    const[note,setNote] = useState({id:"",title:"",description:'',tag:''})
    const handleClick = () =>{
      console.log("updated...",note)
      refClose.current.click();
      showAlert("update sucessfully","success")
      editnote(note)
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const updatenote = (currnote) =>{
        ref.current.click();
        setNote({id:currnote._id,title:currnote.title,description:currnote.description,tag:currnote.tag})
        
        console.log("clicked")
    }
  return (
    <>

    <AddNote showAlert={showAlert}/>
    <button ref={ref} type="button" className='d-none' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
</button>
    {/* modal  */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Edit</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange}/>
    
  </div>
  <div className="form-floating">
  <textarea className="form-control" placeholder="write a description here" value={note.description} name='description' id="floatingTextarea2" onChange={onChange} style={{"height": "100px"}}></textarea>
  <label htmlFor="floatingTextarea2">description</label>
</div>
<div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
    
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>update note</button>
      </div>
    </div>
  </div>
</div>
    <div className="container">

    <div className="row my-4">
        <h2 className='text-center'>Your Notes</h2>
        {notes.length === 0 &&<div className="container fs-5">No Notes to display</div> } 
        {
            Array.isArray(notes)?notes.map((note,index)=>{
                return(<Noteitem note={note} updatenote={updatenote} showAlert={showAlert}  key={index}/>)
            }): null
        }
    </div>
        </div>
    </>

  )
}

export default Notes