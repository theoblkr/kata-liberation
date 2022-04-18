import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMovieRating } from '../../store/actions/movies'

const Rating = ({ moviesId }) => {
  const ratingsList = Array.from(Array(11).keys())
  const [ ratingAdded, setRatingAdded ] = useState()
  const dispatch = useDispatch()

  const addRating = (rating) => {
    setRatingAdded(rating)
    dispatch(addMovieRating(moviesId, rating))
  }
  return (
    <>
      <h4>Ajouter une note</h4>
      {ratingsList.map((rating) => {
        return <Button key={rating} variant={ratingAdded === rating ? 'contained' : 'text'} onClick={() => addRating(rating)}>{rating}</Button>
      })}
    </>
  )
}

export default Rating