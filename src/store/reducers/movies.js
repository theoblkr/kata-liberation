import { FETCH_LATEST_RELEASE_MOVIES } from '../types'

const INITIAL_STATE = {
  movies: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_LATEST_RELEASE_MOVIES:
    return {
      ...state,
      movies: state.movies,

    }

  default:
    return state
  }

}

export default reducer