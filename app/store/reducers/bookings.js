import { createReducer } from '../../helpers/redux'

import {
  FETCH_USER_BOOKINGS,
  FETCH_AVAILABLE_CARS,
  FETCH_SELECTED_CAR,
  UNSELECT_CAR,
  BOOK_CAR,
  SELECT_RIDE,
  UNSELECT_RIDE,
  CHECK_LICENSE
} from 'store/actions/bookings'

const initialState = {
  pending: false,
  upcoming: [],
  history: [],
  fetchError: null,
  cars: [],
  selectedCar: null,
  selectedRide: null,
  fetchingCar: false,
  fetchCarsError: null,
  fetchCardsPending: false,
  bookCarError: null,
  bookCarPending: false,
  licenseCheckPending: false,
  licenseCheckError: null,
  licenseChecked: false
}

const handlers = {
  [FETCH_USER_BOOKINGS.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      pending: true,
      fetchError: null
    }
  },
  [FETCH_USER_BOOKINGS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      upcoming: payload.upcoming,
      history: payload.history
    }
  },
  [FETCH_USER_BOOKINGS.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      fetchError: payload
    }
  },
  [FETCH_AVAILABLE_CARS.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      fetchCardsPending: true,
      fetchCarsError: null
    }
  },
  [FETCH_AVAILABLE_CARS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      fetchCardsPending: false,
      cars: payload
    }
  },
  [FETCH_AVAILABLE_CARS.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      fetchCardsPending: false,
      fetchCarsError: payload
    }
  },
  [FETCH_SELECTED_CAR.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      fetchingCar: true,
      selectedCar: null
    }
  },
  [FETCH_SELECTED_CAR.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      fetchingCar: false,
      fetchCarError: payload
    }
  },
  [FETCH_SELECTED_CAR.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      fetchingCar: false,
      selectedCar: payload
    }
  },
  [UNSELECT_CAR]: (state, { payload }) => {
    return {
      ...state,
      selectedCar: null
    }
  },
  [SELECT_RIDE]: (state, { payload }) => {
    return {
      ...state,
      selectedRide: payload
    }
  },
  [UNSELECT_RIDE]: (state, { payload }) => {
    return {
      ...state,
      selectedRide: null
    }
  },
  [BOOK_CAR.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      bookCarPending: true,
      bookCarError: null
    }
  },
  [BOOK_CAR.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: [...state.upcoming, payload.booking],
      bookCarPending: false
    }
  },
  [BOOK_CAR.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      bookCarPending: false,
      bookCarError: payload
    }
  },
  [CHECK_LICENSE.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      licenseCheckPending: true,
      licenseCheckError: null,
      licenseChecked: false
    }
  },
  [CHECK_LICENSE.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.map(book => { return payload.id === book.id ? payload : book }),
      selectedRide: payload,
      licenseChecked: true,
      licenseCheckPending: false
    }
  },
  [CHECK_LICENSE.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      licenseCheckPending: false,
      licenseCheckError: payload
    }
  }
}
export default createReducer(initialState, handlers)
