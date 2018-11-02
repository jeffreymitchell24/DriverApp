import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Component from './Filters'

const actions = {}

const selector = createStructuredSelector({})

export default connect(
  selector,
  actions
)(Component)
