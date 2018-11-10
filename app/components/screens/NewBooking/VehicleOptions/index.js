import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getFilters } from 'store/selectors/filters'

import { updateFilter } from 'store/actions/newBookingsFilters'

import Components from './VehicleOptions'
const actions = {
  onFilterUpdate: updateFilter
}

const selector = createStructuredSelector({
  filters: getFilters
})

export default connect(
  selector,
  actions
)(Components)
