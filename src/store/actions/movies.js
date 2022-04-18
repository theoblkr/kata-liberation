import { callApi } from '../../helpers/api'
import { ADD_MOVIE_RATING, ADD_MOVIE_TO_LIST, FETCH_LATEST_RELEASE_MOVIES, FETCH_MOVIE_RECOMMENDATIONS, FETCH_SINGLE_MOVIE } from '../types'
import { retriveApprovalUser, retriveGuestSessionId, retriveSessionUser } from './authentication'

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

export const getSingleMovieRecommendations = (id, page) => {
  return async (dispatch) => {
    const { data: movieRecommendations } = await callApi({
      method: 'GET',
      endpoint:`movie/${id}/recommendations`,
      queryString: `&page=${page}`,
    })
    dispatch({
      type: FETCH_MOVIE_RECOMMENDATIONS,
      payload: {
        singleMovieRecommendations: movieRecommendations.results,
        currentPageRecommendations: movieRecommendations.page,
        totalPageRecommendations: movieRecommendations.total_pages,
      } })
  }
}

export const addMovieRating = (id, rating) => {
  return async (dispatch) => {
    const guestSession = await retriveGuestSessionId()

    const { data: movieRating } = await callApi({
      method: 'POST',
      endpoint:`movie/${id}/rating`,
      data:{ value: rating },
      guestSession: guestSession,
    })
    dispatch({
      type: ADD_MOVIE_RATING,
      payload: {
        movieRatingId: id,
        movieRatingMessage: movieRating.status_message,
      } })
  }
}

export const askForCreatingMovieList = async () => {
  const approvalUser = await retriveApprovalUser()
  return approvalUser
}

export const createMovieList = () => {
  return async (dispatch) => {
    const tokenUser = localStorage.getItem('tokenUser')
    const sessionId = await retriveSessionUser(tokenUser)

    const { data: list } = await callApi({
      method: 'POST',
      endpoint:'list',
      sessionId: sessionId,
    })
    console.log(list)
  }
}

export const addMovieToList= (id, token) => {
  return async (dispatch) => {
    const { data: movieList } = await callApi({
      method: 'POST',
      endpoint:`movie/${id}/rating`,
    })
    dispatch({
      type: ADD_MOVIE_TO_LIST,
      payload: {
        movieListId: id,
        movieListMessage: movieList.status_message,
      } })
  }
}
