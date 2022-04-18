import axios from 'axios'

const TOKEN_NAME = 'foodspotweb'

export const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME)
}

export const storeToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}


export const callApi = ({
  method, endpoint, data = {}, config = {}, withAuth = true,
}) => {
  const secret_token = getToken()
  let headers = {}
  if (withAuth) {
    headers = { ...headers, Authorization: `Bearer ${secret_token}` }
  }
  
  return axios({
    url: `${process.env.REACT_APP_API_ROOT}/${endpoint}`,
    method,
    data,
    headers,
    ...config,
  })
    .then((response) => {
      return response.data
    })
    // .catch((error) => {
    //   // console.error('API error', method, endpoint, error)
    //   throw new Error(error)
    // })
}

// React Query Helpers
// ************************************

export const optimisticUpdateItem = ({ queryClient, queryName, values }) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  queryClient.cancelQueries(queryName)
  
  // Snapshot the previous value
  const previousItems = queryClient.getQueryData(queryName)
  
  // Optimistically update to the new value
  const oldItem = previousItems.find((item) => item.id === values.id)
  const newItem = { ...oldItem, ...values }
  queryClient.setQueryData(queryName, (old) => old.map((item) => (item.id === newItem.id ? newItem : item)))

  // Return the snapshotted value for rollback
  return () => queryClient.setQueryData(queryName, previousItems)
}

export const optimisticCreateItem = ({ queryClient, queryName, values }) => {
  queryClient.cancelQueries(queryName)
  const previousItems = queryClient.getQueryData(queryName) || []
  const newItems = previousItems.concat(values)
  queryClient.setQueryData(queryName, newItems)
  return () => queryClient.setQueryData(queryName, previousItems)
}

export const optimisticDeleteItem = ({ queryClient, queryName, id }) => {
  queryClient.cancelQueries(queryName)
  const previousItems = queryClient.getQueryData(queryName)
  const newItems = previousItems.filter((item) => item.id !== id)
  queryClient.setQueryData(queryName, newItems)
  return () => queryClient.setQueryData(queryName, previousItems)
}
