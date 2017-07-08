const initialState = {
  isWaiting: false,
  user: null
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
        user: {
          name: action.user.name,
          username: action.user.login,
          email: action.user.email,
          avatar: action.user.avatar_url,
          location: action.user.location,
          company: action.user.company
        }
      };

    default:
      return state;
  }
};

export default reducer;
