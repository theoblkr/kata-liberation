/* eslint-disable indent */
import { ADD_MOVIE_RATING, FETCH_LATEST_RELEASE_MOVIES, FETCH_MOVIE_RECOMMENDATIONS, FETCH_SINGLE_MOVIE } from '../types'

const INITIAL_STATE = {
  movies: [],
  singleMovie: {},
  singleMovieRecommendations: [],
  currentPage: 1,
  totalPage: 10,
  currentPageRecommendations: 1,
  totalPageRecommendations: 10,
  movieRatingId: 1,
  movieRatingMessage: '',
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LATEST_RELEASE_MOVIES:
      return {
        ...state,
        movies: action.payload.listMovies,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
      }
    case FETCH_SINGLE_MOVIE:
      return {
        ...state,
        singleMovie: action.payload.singleMovie,
      }
    
    case FETCH_MOVIE_RECOMMENDATIONS:
      return {
        ...state,
        singleMovieRecommendations: action.payload.singleMovieRecommendations,
        currentPageRecommendations: action.payload.currentPageRecommendations,
        totalPageRecommendations: action.payload.totalPageRecommendations,
      }
    
    case ADD_MOVIE_RATING:
      return {
        ...state,
        movieRatingId: action.payload.movieRatingId,
        movieRatingMessage: action.payload.movieRatingMessage,
      }

    default:
      return state
    }

}

export default reducer