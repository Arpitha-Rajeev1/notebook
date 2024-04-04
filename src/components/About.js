import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update()
  }, [a])
  
  return (
    <div>{a.state.name} and {a.state.class}</div>
  )
}

export default About