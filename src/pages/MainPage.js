import { Container, Typography } from '@mui/material'
import React from 'react'
import ListMovies from '../components/ListMovies'

const MainPage = () => {
  return (
    <Container maxWidth='xl'>
      <Typography variant="h1" fontSize={35} textAlign='center' marginY={7}>Kata Libération</Typography>
      <ListMovies />
    </Container>
  )
}

export default MainPage