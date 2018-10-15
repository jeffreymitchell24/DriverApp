import { createReducer } from '../../helpers/redux'

import {
  FETCH_USER_BOOKINGS,
  FETCH_AVAILABLE_CARS,
  FETCH_SELECTED_CAR,
  UNSELECT_CAR,
  BOOK_CAR
} from 'store/actions/bookings'

const initialState = {
  pending: false,
  upcoming: [],
  history: [],
  fetchError: null,
  cars: [],
  selectedCar: null,
  fetchingCar: false,
  fetchCarsError: null,
  fetchCardsPending: false,
  bookCarError: null,
  bookCarPending: false
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
      bookCarPending: false
    }
  },
  [BOOK_CAR.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      bookCarPending: false,
      bookCarError: payload
    }
  }
}
export default createReducer(initialState, handlers)
