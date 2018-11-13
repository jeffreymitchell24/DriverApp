import Upcoming from './ProfileButton'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { getUserData } from 'store/selectors'

const selector = createStructuredSelector({
  user: getUserData
})

const actions = {}

export const ProfileButton = connect(
  selector,
  actions
)(Upcoming)
