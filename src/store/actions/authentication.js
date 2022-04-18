import { callApi } from '../../helpers/api'

export const retriveGuestSessionId = async () => {
  const { data : { guest_session_id } } = await callApi({
    method: 'POST',
    endpoint:'/authentication/guest_session/new',
  })
  return guest_session_id
}
  