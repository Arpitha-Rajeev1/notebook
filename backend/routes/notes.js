const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// Route 1: Get all the notes using GET: '/api/notes/getnotes'. login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error occured')
    }
})

// Route 2: Add a new note using POST: '/api/notes/addnote'. login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Must be minimum 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // check if fields are empty
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error occured')
    }
})

// Route 3: Update an existing note using: PUT '/api/notes/updatenote'. login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body

    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // find the note to be updated
    let note = await Notes.findById(req.params.id)
    if (!note) {
        return res.status(404).send('Not found')
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).json('Not allowed')
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
})

// Route 4: Delete an existing note using: DELETE '/api/notes/deletenote'. login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // find the note to be deleted
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send('Not found')
        }
        // allow deletion only after authenticated
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json('Not allowed')
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ 'Success': 'Note has been deleted', note: note })
    } catch(error) {
        console.log(error)
        res.status(500).send('Some error occured')
    }
})

module.exports = router