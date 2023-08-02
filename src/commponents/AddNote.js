import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = ({showAlert}) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const[note,setNote] = useState({title:"",description:"",tag:'General'})
    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note)
        setNote({title:"",description:"",tag:'General'})
      

    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
             <h2>Add a Notes</h2>
      <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' minLength={5} value={note.title} onChange={onChange}/>
    
  </div>
  <div className="form-floating">
  <textarea className="form-control" placeholder="write a description here" value={note.description} minLength={5} name='description' id="floatingTextarea2" onChange={onChange} style={{"height": "100px"}}></textarea>
  <label htmlFor="floatingTextarea2">description</label>
</div>
<div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
    
  </div>

  <button disabled={note.title.length<5 || note.description.length<5} type="submit"  className="btn btn-primary my-4" onClick={()=>showAlert("Add note successfully","success")}>Add Note</button>
</form>
    </div>
  )
}

export default AddNote