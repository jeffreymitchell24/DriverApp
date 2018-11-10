import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getFilters } from 'store/selectors/filters'
import { getIsFetchingCarCategories } from 'store/selectors/newBooking'

import { fetchAvailableCars } from 'store/actions/bookings'
import { updateFilter } from 'store/actions/newBookingsFilters'
import { loadCarCategories } from 'store/actions/newBooking'

import Component from './Filters'

const actions = {
  onFilterUpdate: updateFilter,
  onFetchAvailableCars: fetchAvailableCars,
  onCarCategoriesLoad: loadCarCategories
}

const selector = createStructuredSelector({
  filters: getFilters,
  isFetchingCarCategories: getIsFetchingCarCategories
})

export default connect(
  selector,
  actions
)(Component)
