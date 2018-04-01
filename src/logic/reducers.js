import * as types from './types'

const initialState = {
  history: undefined,
  sessions: {
    1: {
      start: undefined,
      finish: undefined,
      blocks: {
        1: {
          completed: false,
          start: undefined,
          finish: undefined,
          omission: 0,
          commission: 0,
          trials: [
            { rt: 0, delay: 300, start: undefined}
          ]
        }
      }
    }
  },
  profile: {
    name: undefined,
    age: undefined,
  }
}

const reducer = (state = undefined, action) => {
  if (action.type == 'ADD_HISTORY') {
    return { ...state, history: action.payload}
  }
  return state
}

export default reducer