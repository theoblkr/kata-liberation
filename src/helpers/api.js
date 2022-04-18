import axios from 'axios'

export const getAPIKey = () => {
  return process.env.REACT_APP_MOVIESDB_API_KEY
}

export const callApi = ({
  method, endpoint, data = {}, config = {}, queryString = '', guestSession = '',
}) => {
  const secret_token = getAPIKey()
  const headers = {}

  try {
    return axios({
      url: `${process.env.REACT_APP_API_ROOT}/${endpoint}?api_key=${secret_token}${queryString}${guestSession ? `&guest_session_id=${guestSession}` : ''}`,
      method,
      data,
      headers,
      ...config,
    })
  } catch (error) {
    throw new Error(error)
  }
}