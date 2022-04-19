import { Button, Container, Typography } from '@mui/material'
import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ListMovies from '../components/movies/ListMovies'
import { askForCreatingMovieList, createMovieList, getMovies } from '../store/actions/movies'
import { retrieveSessionUser } from '../store/actions/authentication'

const MainPage = () => {
  const dispatch =  useDispatch()
  const { search } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [ search ])
  const [ page, setPage ] = useState(1)
  const [ listCreated, setListCreated ] = useState(false)

  const retrieve_token = query.get('request_token') || null

  const sessionUser = localStorage.getItem('sessionUser')

  const onRetriveResultFromPage = (pageNumber) => {
    setPage(pageNumber)
  }

  const onCreateMovieList = async () => {
    const urlAuthorizationSession = await askForCreatingMovieList()
    setListCreated(true)
    window.location.href = urlAuthorizationSession
  }

  useEffect(() => {
    dispatch(getMovies(page))
  }, [ dispatch, page ])

  useEffect(() => {
    if(!sessionUser) {
      retrieveSessionUser(retrieve_token)
    }
  }, [ sessionUser, retrieve_token ])

  useEffect(() => {
    if(sessionUser && listCreated) {
      dispatch(createMovieList(sessionUser))
    }
  }, [ dispatch, sessionUser, listCreated ])
  
  
  return (
    <Container maxWidth='xl'>
      <Typography variant="h1" fontSize={35} textAlign='center' marginY={7}>Kata Libération</Typography>
      <Button variant={'contained'} onClick={() => onCreateMovieList()}>Créer ma liste de film</Button>
      <ListMovies onRetriveResultFromPage={onRetriveResultFromPage} />
    </Container>
  )
}

export default MainPage