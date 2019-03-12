import axiox from 'axios'
import { FETCH_USER } from './type'

export const FetchUser = () => async dispatch => {
  const respone = await axiox.get('/api/current_user')

  dispatch({
    type: FETCH_USER,
    payload: respone.data
  })
}
