import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = ({ note,updatenote,showAlert }) => {
    const context = useContext(noteContext)
    const {deletenote} = context;

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="far fa-trash-alt mx-2 text-danger" onClick={()=>{deletenote(note._id); showAlert("Delete succesfully","success")}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{updatenote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem