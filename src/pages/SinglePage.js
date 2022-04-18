import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Infos from '../components/singleMovie/Infos'
import Rating from '../components/singleMovie/Rating'
import Recommendations from '../components/singleMovie/Recommendations'
import { getSingleMovie, getSingleMovieRecommendations } from '../store/actions/movies'

const SinglePage = () => {
  const dispatch = useDispatch()
  const { idMovie } = useParams()
  const [ page, setPage ] = useState(1)

  const onRetriveResultFromPage = (page) => {
    setPage(page)
  }
  useEffect(() => {
    dispatch(getSingleMovie(idMovie))
    dispatch(getSingleMovieRecommendations(idMovie, page))
  }, [ dispatch, idMovie, page ])
    
  return (
    <Box maxWidth='90%' ml={7}>
      <Typography variant="h2" fontSize={20} marginTop={7} marginBottom={4}>Your Movie</Typography>
      <Infos />
      <Rating moviesId={idMovie} />
      <Recommendations onRetriveResultFromPage={onRetriveResultFromPage} />
    </Box>
  )
}

export default SinglePage