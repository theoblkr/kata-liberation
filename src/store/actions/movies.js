import { callApi } from '../../helpers/api'
import { FETCH_LATEST_RELEASE_MOVIES } from '../types'

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
        listMovies: movies.results,
        currentPage: movies.page,
        totalPage: movies.total_pages,
      } })
  }
}
