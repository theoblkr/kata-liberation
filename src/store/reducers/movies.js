/* eslint-disable indent */
import { FETCH_LATEST_RELEASE_MOVIES, FETCH_SINGLE_MOVIE } from '../types'

const INITIAL_STATE = {
  movies: [],
  singleMovie: {},
  currentPage: 1,
  totalPage: 10,
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

    default:
      return state
    }

}

export default reducer