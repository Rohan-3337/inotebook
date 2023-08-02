import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) =>{
  // const host = "http://localhost:5000"
  const host ="https://inotebook-iyuq.onrender.com"
    const notesinitial = []
      const [notes,setNotes] = useState(notesinitial)
      

          // get a note
          const getNote = async()=>{
            const response = await fetch(`${host}/api/notes/fetchallnotes`,{
              method:'GET',
              headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
              },
          
            })
            const json = await response.json()
            console.log(json)
            setNotes(json)
          }
    const addNote = async({title,description,tag})=>{
      const response = await fetch(`${host}/api/notes/addnotes`,{
        method:'POST',
        headers:{
          'Content-type':"application/json",
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
    
      })
      console.log(response)
      const note = await response.json();
      setNotes(notes?.concat(note))
    }


      //delete note
      const deletenote = async(id) =>{
        console.log("delete " + id)
        // const newnote =notes.filter((note)=>{return note._id !== id})
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-type':"application/json",
            'auth-token':localStorage.getItem('token')
          },
      
        })
        const json = await response.json()
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        
        
      }
      //edit a note
      const editnote = async({id,title,description,tag}) =>{
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'Content-type':"application/json",
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        })
        const json = await response.json()
        console.log(json)
        
        let Newnote = JSON.parse((JSON.stringify(notes)))

        for (let index = 0; index < Newnote.length; index++) {
          const element = Newnote[index];
          if(element._id === id){
            Newnote[index].title = title
            Newnote[index].description = description
            Newnote[index].tag = tag
          }
          setNotes(Newnote)
        }
      }

      
    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deletenote,editnote,getNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;