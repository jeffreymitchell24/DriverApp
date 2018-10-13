import R from 'ramda'

export const getLicenses = R.path(['registration', 'documents', 'licenses'])
export const getSelectedLicense = R.path(['registration', 'selectedLicense'])
export const getRideshareApps = R.path(['registration', 'apps'])
export const getPersonalInfo = R.path(['registration', 'profileInfo'])
export const getCredentials = R.path(['registration', 'credentials'])
export const getRequestStatus = R.path(['registration', 'pending'])
