import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getAdressHistory } from 'store/selectors/newBooking'

import { addAddressToHistory } from 'store/actions/newBooking'
import { updateFilter } from 'store/actions/newBookingsFilters'

import Component from './PickupLocation'

const actions = {
  onFilterUpdate: updateFilter,
  onChooseAddress: addAddressToHistory
}

const selector = createStructuredSelector({
  history: getAdressHistory
})

export default connect(
  selector,
  actions
)(Component)
