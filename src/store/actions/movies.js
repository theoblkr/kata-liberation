import { FETCH_LATEST_RELEASE_MOVIES } from '../types'

export const getMovies = () => {
  return {
    type: FETCH_LATEST_RELEASE_MOVIES,
  }
}
