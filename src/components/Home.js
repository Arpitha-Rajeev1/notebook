import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
import Notes from './Notes';

function Home() {

  const navigate = useNavigate()
  const context = useContext(NoteContext)
  const { notes, addNote, getNotes } = context;
  const [note, setnote] = useState({ title: '', desc: '', tag: '' })

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else {
      navigate('/login')
    }
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.desc, note.tag)
  }

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='m-5'>
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" onChange={handleChange} name='title' className="form-control" id="title" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="desc" onChange={handleChange} name='desc' className="form-control" id="desc" />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="tag" onChange={handleChange} name='tag' className="form-control" id="tag" />
          </div>

          <button onClick={handleClick} type="submit" className="btn btn-primary">Add note</button>
        </form>
      </div>

      <div className="m-5">
        <h2>Your notes</h2>
        <div className="my-5 flex flex-wrap justify-between">
          {notes && notes.map((note) => {
            return <Notes key={note._id} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Home