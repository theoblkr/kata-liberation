import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ListMovies from '../components/movies/ListMovies'
import { createMovieList, getMovies } from '../store/actions/movies'

const MainPage = () => {
  const dispatch =  useDispatch()
  const [ page, setPage ] = useState(1)

  const onRetriveResultFromPage = (pageNumber) => {
    setPage(pageNumber)
  }
  useEffect(() => {
    dispatch(getMovies(page))
  }, [ dispatch, page ])

  useEffect(() => {
    dispatch(createMovieList())
  }, [ dispatch ])
  
  return (
    <Container maxWidth='xl'>
      <Typography variant="h1" fontSize={35} textAlign='center' marginY={7}>Kata Libération</Typography>
      <ListMovies onRetriveResultFromPage={onRetriveResultFromPage} />
    </Container>
  )
}

export default MainPage