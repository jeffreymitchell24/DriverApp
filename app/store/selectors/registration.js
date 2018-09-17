import R from 'ramda'

export const getLicenses = R.path(['registration', 'documents', 'licenses'])
export const getSelectedLicense = R.path(['registration', 'selectedLicense'])
