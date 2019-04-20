import { FECTH_SURVEY } from '../actions/type'

export default function(state = [], action){
  switch (action.type) {
    case FECTH_SURVEY :
      return action.payload
    default:
      return state
  }
}
