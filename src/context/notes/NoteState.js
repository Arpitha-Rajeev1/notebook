import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000'
    const notesInitial = []

    const s1 = {
        'name': 'Arpitha',
        'class': '5b'
    }

    const [state, setstate] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setstate({
                'name': 'Larry',
                'class': '10b'
            })
        }, 1000);
    }

    const [notes, setNotes] = useState(notesInitial)

    // get all note
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // add a note
    const addNote = async (title, desc, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description: desc, tag })
        });

        const json = await response.json()
        setNotes(notes.concat(json))
    }

    // delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json)
        const newNotes = notes.filter((note) => note._id !== id)
        setNotes(newNotes)
    }

    // edit a note
    const editNote = async (id, title, desc, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description: desc, tag })
        });
        const json = await response.json()
        console.log(json)        

        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index]
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = desc;
                newNote[index].tag = tag
                break;
            }
        }
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ state, update, notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState