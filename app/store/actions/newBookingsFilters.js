export const UPDATE_FILTER = 'filters/UPDATE_FILTER'
export const updateFilter = (filter, nextValue) => {
  return {
    type: UPDATE_FILTER,
    payload: {
      filter,
      nextValue
    }
  }
}
