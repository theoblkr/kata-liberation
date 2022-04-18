/* eslint-disable indent */
import { FETCH_LATEST_RELEASE_MOVIES } from '../types'

const INITIAL_STATE = {
  movies: [],
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

    default:
      return state
    }

}

export default reducer