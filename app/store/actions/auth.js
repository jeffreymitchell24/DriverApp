
export const SAVE_SIGNUP_STEP_DATA = 'SAVE_SIGNUP_STEP_DATA'
export const saveSignUpStepData = ({stepData, step}) => {
  return {
    type: SAVE_SIGNUP_STEP_DATA,
    payload: {
      step, stepData
    }
  }
}
