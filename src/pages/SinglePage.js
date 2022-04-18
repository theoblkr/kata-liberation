import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Infos from '../components/singleMovie/Infos'
import { getSingleMovie } from '../store/actions/movies'

const SinglePage = ({ props }) => {
  const dispatch = useDispatch()
  const { idMovie } = useParams()

  useEffect(() => {
    dispatch(getSingleMovie(idMovie))
  }, [ dispatch, idMovie ])
    
  return (
    <div>
      <Typography variant="h2" fontSize={20} marginTop={7} marginBottom={4}>Your Movie</Typography>
      <Infos/>
    </div>
  )
}

export default SinglePage