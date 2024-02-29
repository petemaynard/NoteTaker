const router = require("express").Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()

//const User = require("../../controllers/user.controller")

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
} = require("../../controllers/note.controller")

// tokens are encrypted non-invasive data about the user 
function createToken(id){
  return jwt.sign({ id: id }, process.env.JWT_SECRET)
}

router.get("/", async (req, res) => {
  try {
    const payload = await getAllNotes()
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getNoteById(req.params.id)
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createNote(req.body)
    const token = createToken(payload._id)
    res.status(200).cookie("auth_cookie", token).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateNoteById(req.params.id, req.body)
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteNoteById(req.params.id)
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

module.exports = router;