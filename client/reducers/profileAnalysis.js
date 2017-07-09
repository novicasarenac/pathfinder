const initialState = {
  isWaiting: false,
  user: null,
  languageUsageStats: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SENT':
      return {
        ...state,
        isWaiting: true
      };

    case 'USER_RESPONSE_RECEIVED':
      return {
        ...state,
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

    case 'LANGUAGE_USAGE_STATS':
      return {
        ...state,
        languageUsageStats: action.percentages
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
