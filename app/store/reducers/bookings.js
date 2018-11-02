import { createReducer } from '../../helpers/redux'

import {
  FETCH_USER_BOOKINGS,
  FETCH_AVAILABLE_CARS,
  FETCH_SELECTED_CAR,
  UNSELECT_CAR,
  BOOK_CAR,
  SELECT_RIDE,
  UNSELECT_RIDE,
  CHECK_LICENSE,
  CANCEL_RIDE,
  END_RIDE,
  RESET_RIDE_CANCEL_ERROR,
  SEND_LATE_FOR_RIDE_DETAILS,
  // SEND_LATE_FOR_RIDE_NOTIFICATION,
  HELP_RIDE_DAMAGED,
  HELP_RIDE_MALFUNCTIONED,
  SUBMIT_RECEIPT
} from 'store/actions/bookings'

const initialState = {
  pending: false,
  upcoming: {
    all: [],
    oneTime: [],
    recurring: []
  },
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
  licenseChecked: false,
  rideCancelPending: false,
  rideCancelError: null,
  rideEndPending: false,
  rideEndError: null
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
      ...payload
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
      upcoming: state.upcoming.map(book => {
        return payload.id === book.id ? payload : book
      }),
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
  },
  [CANCEL_RIDE.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      rideCancelPending: true,
      rideCancelError: null
    }
  },
  [CANCEL_RIDE.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.filter(book => book.id !== payload.id),
      rideCancelPending: false
    }
  },
  [CANCEL_RIDE.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      rideCancelPending: false,
      rideCancelError: payload
    }
  },
  [RESET_RIDE_CANCEL_ERROR]: (state, { payload }) => {
    return {
      ...state,
      rideCancelError: null
    }
  },
  [SEND_LATE_FOR_RIDE_DETAILS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.map(book => {
        return payload.id === book.id ? payload : book
      }),
      selectedRide: payload
    }
  },
  [HELP_RIDE_DAMAGED.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.map(book => {
        return payload.id === book.id ? payload : book
      }),
      selectedRide: payload
    }
  },
  [HELP_RIDE_MALFUNCTIONED.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.map(book => {
        return payload.id === book.id ? payload : book
      }),
      selectedRide: payload
    }
  },
  [SUBMIT_RECEIPT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.map(book => {
        return payload.id === book.id ? payload : book
      }),
      selectedRide: payload
    }
  },
  [END_RIDE.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      rideEndPending: true,
      rideEndError: null
    }
  },
  [END_RIDE.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      upcoming: state.upcoming.filter(book => book.id !== payload.id),
      history: [payload, ...state.history],
      selectedRide: payload,
      rideEndPending: false
    }
  },
  [END_RIDE.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      rideEndPending: false,
      rideEndError: payload
    }
  }
}
export default createReducer(initialState, handlers)
