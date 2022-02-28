import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
    <h1>Welcomed: DogDeck</h1>
    <Link to='/home'>
        <button>Home</button>
    </Link>

    </>
  )
}

export default Landing