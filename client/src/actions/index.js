import axiox from 'axios'
import { FETCH_USER, FECTH_SURVEY } from './type'

export const FetchUser = () => async dispatch => {
  const response = await axiox.get('/api/current_user')

  dispatch({
    type: FETCH_USER,
    payload: response.data
  })
}

export const HandleToken = token => async dispatch => {
  const response = await axiox.post('/api/stripe', token)

  dispatch({
    type: FETCH_USER,
    payload: response.data
  })
}

export const SubmitForm = (survey, history) => async dispatch => {
  const response = await axiox.post('/api/surveys', survey)
  
  dispatch({
    type: FETCH_USER,
    payload: response.data
  })

  history.push('/survay')
}

export const FetchSurvey = () => async dispatch => {
  const response = await axiox.get('api/surveys')
  debugger
  dispatch({
    type: FECTH_SURVEY,
    payload: response.data
  })
}
