


export default function AddNote(props){



  function handleInputChange(e){
    props.setNewNote({...props.newNote, [e.target.name]: e.target.value })
  }

  async function addNewNote(e){
   e.preventDefault()
   
   try {
      const query = await fetch("/api/note", {
         method: "POST",
         body: JSON.stringify(newNote),  // What goes in parentheses
         headers: {
            'Content-Type': 'application/json'
         }
      })
      const result = await query.json()
      console.log(result)
      // Send user back to homepage
      window.location.href = "/"
   } catch (err) {
      console.log("Couldn't post note")
   }

   //  e.preventDefault()
   //  // add the current note to the notes array
   //  props.setNotes([...props.notes, props.newNote])
   //  // revert form back to its original state
   //  props.setNewNote(props.defaultForm)
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" name="title" id="title" className="form-control" value={props.newNote.title} onChange={handleInputChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">Body</label>
        <textarea name="body" className="form-control" id="body" value={props.newNote.body} onChange={handleInputChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="priority" className="form-label">Priority</label>
        <select name="priority" className="form-select" value={props.newNote.priority} onChange={handleInputChange}>
          <option value="0" hidden>Choose</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={addNewNote}>Save Note</button>
    </form>
  )
}