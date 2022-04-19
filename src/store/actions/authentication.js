import { callApi } from '../../helpers/api'

export const retrieveSessionUser = async (request_token) => {
  const { data } = await callApi({
    method: 'POST',
    endpoint:'authentication/session/new',
    data: { request_token: request_token },
  })

  if(data.session_id) {
    localStorage.setItem('sessionUser', data.session_id)
    return true
  }
  return false
}
  
export const retriveApprovalUser = async () => {
  const token = await retriveTokenUser()
  return `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000`
}
  
export const retriveTokenUser = async () => {
  const { data : { request_token } } = await callApi({
    method: 'GET',
    endpoint:'authentication/token/new',
  })
  return request_token
}

  