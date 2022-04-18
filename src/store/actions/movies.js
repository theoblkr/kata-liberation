import { callApi } from '../../helpers/api'
import { FETCH_LATEST_RELEASE_MOVIES, FETCH_SINGLE_MOVIE } from '../types'

export const getMovies =  (page) => {
  return async (dispatch) => {
    const { data: movies } = await callApi({
      method: 'GET',
      endpoint:'movie/now_playing',
      queryString: `&page=${page}`,
    })
    dispatch({
      type: FETCH_LATEST_RELEASE_MOVIES,
      payload: {
        listMovies: movies.results.sort((a,b) => Date.parse(b.release_date) - Date.parse(a.release_date)),
        currentPage: movies.page,
        totalPage: movies.total_pages,
      } })
  }
}

export const getSingleMovie = (id) => {
  return async (dispatch) => {
    const { data: movie } = await callApi({
      method: 'GET',
      endpoint:`movie/${id}`,
    })
    dispatch({
      type: FETCH_SINGLE_MOVIE,
      payload: {
        singleMovie: movie,
      } })
  }
}
