import axiox from 'axios'
import { FETCH_USER } from './type'

const FetchUser = () => dispatch => {
  axiox.get('/api/current_user').then(res => dispatch({
    action: FETCH_USER,
    payload: res
  }))
}

export default FetchUser
