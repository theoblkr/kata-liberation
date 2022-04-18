import { Box, Typography } from '@mui/material'
import React from 'react'

const MovieCard = ({ movie }) => {
  const { release_date, title } = movie
  return (
    <Box marginTop={7} marginBottom={4}>
      <Typography variant="h3" fontSize={15}>{title}</Typography>
      <Typography variant="h4" fontSize={12}>{release_date}</Typography>
    </Box>
  )
}

export default MovieCard