import { callApi } from '../../helpers/api'
import { ADD_MOVIE_RATING, ADD_MOVIE_TO_LIST, FETCH_LATEST_RELEASE_MOVIES, FETCH_MOVIE_RECOMMENDATIONS, FETCH_SINGLE_MOVIE, LIST_CREATED } from '../types'
import { retriveApprovalUser } from './authentication'

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
    const sessionUser = localStorage.getItem('sessionUser')

    const { data: movieRating } = await callApi({
      method: 'POST',
      endpoint:`movie/${id}/rating`,
      data:{ value: rating },
      sessionId: sessionUser,
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

export const createMovieList = (sessionUser) => {
  return async (dispatch) => {
    const { data: list } = await callApi({
      method: 'POST',
      endpoint:'list',
      sessionId: sessionUser,
      data: { 'name': 'default',
        'description': 'default' },
    })
    if(list.list_id) {
      localStorage.setItem('listUser', list.list_id)
      dispatch({
        type: LIST_CREATED,
        payload: {
          listId: list.list_id,
        },
      })
      return true
    }
    return false
  }
}

export const addMovieToList = (moviesId) => {
  return async (dispatch) => {
    const listId = localStorage.getItem('listUser')
    const sessionUser = localStorage.getItem('sessionUser')

    const { data: movieList } = await callApi({
      method: 'POST',
      endpoint:`list/${listId}/add_item`,
      data:{ media_id: moviesId },
      sessionId: sessionUser,
    })
    dispatch({
      type: ADD_MOVIE_TO_LIST,
      payload: {
        movieListMessage: movieList.status_message,
      } })
  }
}
