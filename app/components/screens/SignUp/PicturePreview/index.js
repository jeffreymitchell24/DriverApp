import { connect } from 'react-redux'
import { updateLicense } from 'store/actions/registration'
import { createStructuredSelector } from 'reselect'

import { getSelectedLicense } from 'store/selectors/registration'
import PicturePreview from './PicturePreview'

const selector = createStructuredSelector({
  selectedLicense: getSelectedLicense
})
const actions = {
  onUpdateLicense: updateLicense
}

export default connect(
  selector,
  actions
)(PicturePreview)
