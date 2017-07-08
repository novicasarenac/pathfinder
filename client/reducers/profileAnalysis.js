const initialState = {
  isWaiting: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SENT':
      return {
        ...state,
        isWaiting: true
      };

    case 'RESPONSE_RECEIVED':
      return {
        isWaiting: false,
        user: action.user
      };

    default:
      return state;
  }
};

export default reducer;
