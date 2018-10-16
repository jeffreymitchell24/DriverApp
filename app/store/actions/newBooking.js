
export const SET_DATE = 'SET_DATE'
export const setBookingDate = ({type, date}) => {
  return {
    type: SET_DATE,
    payload: {type, date}
  }
}

export const RESET_DATES = 'RESET_DATES'
export const resetDates = () => {
  return {
    type: RESET_DATES
  }
}
