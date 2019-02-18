import R from 'ramda'

export const getAuthStatus = R.path(['auth', 'pending'])
export const getSigninError = R.path(['auth', 'authError'])

export const getResetPassError = R.path(['auth', 'resetError'])
export const getResetStatus = R.path(['auth', 'resetPending'])
export const getIsResetSent = R.path(['auth', 'resetPasswordSent'])

export const getUserData = R.path(['auth', 'user'])
export const getIsAuthed = R.path(['auth', 'isAuthed'])
export const getIsCheckingUserStatus = R.path(['auth', 'checkingUserStatus'])

export const getUpdateError = R.path(['auth', 'updateError'])

export const getPrevRejectedId = R.path(['auth', 'prevRejected'])

export const isAuthorized = R.path(['auth', 'isAuthed'])
