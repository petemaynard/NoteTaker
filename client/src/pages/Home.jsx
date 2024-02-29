import { useEffect, useState } from 'react'
import AddNote from '../components/AddNote'
import ListNotes from '../components/ListNotes'
import Note from '../components/Note'
// import notesDb from "../notes.json"


import "/node_modules/bootstrap/dist/css/bootstrap.min.css"


export default function Home() {

   const defaultForm = { title: "", body: "", priority: "0" }

   const [notes, setNotes] = useState([])  // Was notesDb in parentheses
   const [newNote, setNewNote] = useState(defaultForm)
   const [currentNote, setCurrentNote] = useState(null)

   async function getNotes() {
      //  const result = await fetch("https://my.api.mockaroo.com/notes.json?key=302071d0")

      console.log("We are in home.jsx before fetch");
      const result = await fetch("/api/note");
      console.log("We are after the fetch")

      const data = await result.json()
      console.log(data)
      const newData = data.payload.map(item => ({ ...item, priority: item.priority.toString() }))
      setNotes(newData)
   }

   useEffect(() => {
     if( !notes.length ){
       getNotes()
     }
   },[])

   useEffect(() => {
      console.log(currentNote)
   }, [currentNote])

   useEffect(() => {
      console.log(notes)
   }, [notes])


   return (
      <>
         <div className="container">
            <div className="row">

               <div className="col-6">
                  <AddNote
                     newNote={newNote}
                     setNewNote={setNewNote}
                     notes={notes}
                     setNotes={setNotes}
                     defaultForm={defaultForm}
                  />
               </div>

               <div className="col-6">
                  <ListNotes notes={notes} setCurrentNote={setCurrentNote} />
                  <Note currentNote={currentNote} />
               </div>
            </div>
         </div>

      </>
   )
}

