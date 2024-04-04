import React, { useContext, useState, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'

const Notes = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote, editNote } = context
    const { note } = props
    const [enote, setenote] = useState({ id: '', etitle: '', edesc: '', etag: '' })
    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setenote({ id: currentNote._id, etitle: currentNote.etitle, edesc: enote.edesc, etag: enote.etag })
    }

    const handleEdit = () => {
        editNote(enote.id, enote.etitle, enote.edesc, enote.etag)
    }

    const ehandleChange = (e) => {
        setenote({ ...enote, [e.target.name]: e.target.value })
    }


    return (
        <>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" onChange={ehandleChange} name='etitle' className="form-control" id="title" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="desc" onChange={ehandleChange} name='edesc' className="form-control" id="desc" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="tag" onChange={ehandleChange} name='etag' className="form-control" id="tag" />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" onClick={handleEdit} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">#{note.tag}</p>
                    <button type="button" onClick={() => updateNote(note)} className="btn btn-warning mx-3">Edit</button>
                    <button type="button" onClick={() => deleteNote(note._id)} className="btn btn-danger mx-3">Delete</button>
                </div>
            </div>

        </>
    )
}

export default Notes