import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getFilters } from 'store/selectors/filters'
import { fetchAvailableCars } from 'store/actions/bookings'
import { updateFilter } from 'store/actions/newBookingsFilters'

import Component from './Filters'

const actions = {
  onFilterUpdate: updateFilter,
  onFetchAvailableCars: fetchAvailableCars
}

const selector = createStructuredSelector({
  filters: getFilters
})

export default connect(
  selector,
  actions
)(Component)
