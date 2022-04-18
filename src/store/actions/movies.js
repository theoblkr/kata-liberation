import { callApi } from '../../helpers/api'
import { ADD_MOVIE_RATING, ADD_MOVIE_TO_LIST, FETCH_LATEST_RELEASE_MOVIES, FETCH_MOVIE_RECOMMENDATIONS, FETCH_SINGLE_MOVIE } from '../types'
import { retriveGuestSessionId } from './authentication'

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

export const createMovieList = () => {
  return async (dispatch) => {
    const { data: listCreate } = await callApi({
      method: 'POST',
      endpoint:'list',
    })
    console.log(listCreate)
    // dispatch({
    //   type: ADD_MOVIE_RATING,
    //   payload: {
    //     movieRatingId: id,
    //     movieRatingMessage: movieRating.status_message,
    //   } })
  }
}

export const addMovieToList= (id, rating) => {
  return async (dispatch) => {
    const { data: movieList } = await callApi({
      method: 'POST',
      endpoint:`movie/${id}/rating`,
      data:{ value: rating },
    })
    dispatch({
      type: ADD_MOVIE_TO_LIST,
      payload: {
        movieListId: id,
        movieListMessage: movieList.status_message,
      } })
  }
}
