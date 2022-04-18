import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addMovieToList } from '../../store/actions/movies'

const AddToList = ({ moviesId }) => {
  const dispatch = useDispatch()

  const addToList = () => {
    const tokenSession = localStorage.getItem('tokenUser')
    if(tokenSession) {
      dispatch(addMovieToList(moviesId, tokenSession))
    }
    return false
  }
  return (
    <>
      <Button variant={'contained'} onClick={() => addToList(moviesId)}>Ajouter à ma liste</Button>
    </>
  )
}

export default AddToList