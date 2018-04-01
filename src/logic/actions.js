// @flow 
import * as types from './types'
export const init = () => ({
  type: types.INIT
})
export const startTrial = () => ({
  type: types.TRIAL_START,
})
export const addHistory = (history) => ({
  type: types.ADD_HISTORY, payload: history
})
