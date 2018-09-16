import R from 'ramda'

export const getSignUpData = R.path(['auth', 'signUpData'])
export const getLicenses = R.path(['auth', 'signUpData', 'documents', 'licenses'])
