import { Pagination } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Recommendations = ({ onRetriveResultFromPage }) => {
  const { singleMovieRecommendations, currentPageRecommendations,
    totalPageRecommendations } = useSelector((state) => state.movies)
  const onChangePage = (event, page) => {
    onRetriveResultFromPage(page)
  }
  return (
    <>
      <h4>Recommendations</h4>
      <ul>
        {singleMovieRecommendations.map((singleReco) => {
          return <li key={singleReco.id}>{singleReco.title}</li>
        })}
      </ul>
      <Pagination value={currentPageRecommendations} count={totalPageRecommendations} color="primary" onChange={onChangePage} />
    </>
  )
}

export default Recommendations