export const ADD_ADDRESS_TO_HISTORY = 'ADD_ADDRESS_TO_HISTORY'
export const addAddressToHistory = address => {
  return {
    type: ADD_ADDRESS_TO_HISTORY,
    payload: address
  }
}
