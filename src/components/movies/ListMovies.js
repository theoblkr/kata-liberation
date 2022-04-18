import { Pagination, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from './MovieCard'

const ListMovies = ({ onRetriveResultFromPage }) => {
  const { movies, currentPage, totalPage } = useSelector((state) => state.movies)

  const onChangePage = (event, page) => {
    onRetriveResultFromPage(page)
  }
  return (
    <>
      <Typography variant="h2" fontSize={20} marginTop={7} marginBottom={4}>Movies now playing</Typography>
      {movies && movies.map((movie) =>
        <Box key={movie.id}>
          <MovieCard movie={movie}/>
        </Box>
      )}
      <Pagination value={currentPage} count={totalPage} color="primary" onChange={onChangePage} />
    </>
  )
}

export default ListMovies