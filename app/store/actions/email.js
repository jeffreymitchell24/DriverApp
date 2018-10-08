import { createAsyncAction } from 'helpers/redux'

export const VALIDATE_EMAIL = createAsyncAction('VALIDATE_EMAIL')
export const validateEmail = ({email}) => {
  return {
    type: VALIDATE_EMAIL.REQUEST,
    payload: {email}
  }
}
