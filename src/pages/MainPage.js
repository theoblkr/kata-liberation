import { Button, Container, Typography } from '@mui/material'
import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ListMovies from '../components/movies/ListMovies'
import { askForCreatingMovieList, createMovieList, getMovies } from '../store/actions/movies'

const MainPage = () => {
  const dispatch =  useDispatch()
  const { search } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [ search ])
  const [ page, setPage ] = useState(1)
  
  const retrieve_token = query.get('request_token') || null

  const onRetriveResultFromPage = (pageNumber) => {
    setPage(pageNumber)
  }
  

  const onCreateMovieList = async () => {
    const urlAuthorizationSession = await askForCreatingMovieList()
    window.location.href = urlAuthorizationSession
  }

  useEffect(() => {
    dispatch(getMovies(page))
  }, [ dispatch, page ])

  useEffect(() => {
    if(retrieve_token) {
      localStorage.setItem('tokenUser', retrieve_token)
      dispatch(createMovieList())
    }
  }, [ dispatch, retrieve_token ])
  
  
  return (
    <Container maxWidth='xl'>
      <Typography variant="h1" fontSize={35} textAlign='center' marginY={7}>Kata Libération</Typography>
      <Button variant={'contained'} onClick={() => onCreateMovieList()}>Créer ma liste de film</Button>
      <ListMovies onRetriveResultFromPage={onRetriveResultFromPage} />
    </Container>
  )
}

export default MainPage