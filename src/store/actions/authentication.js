import { callApi } from '../../helpers/api'

export const retriveGuestSessionId = async () => {
  const { data : { guest_session_id } } = await callApi({
    method: 'POST',
    endpoint:'/authentication/guest_session/new',
  })
  return guest_session_id
}

export const retriveSessionUser = async (request_token) => {
  const { data : { session_id } } = await callApi({
    method: 'POST',
    endpoint:'authentication/session/new',
    data: { request_token: request_token },
  })

  return session_id
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

  