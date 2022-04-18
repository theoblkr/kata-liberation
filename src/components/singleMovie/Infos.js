import React from 'react'
import { useSelector } from 'react-redux'

const Infos = () => {
  const { singleMovie } = useSelector((state) => state.movies)
  const { title, overview, release_date, tagline } = singleMovie
  return (
    <div>
      <p>{title}</p>
      <p>{overview}</p>
      <p>{release_date}</p>
      <p>{tagline}</p>
    </div>
  )
}

export default Infos