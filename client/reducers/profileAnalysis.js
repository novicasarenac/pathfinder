function mapUserState(user) {
  if (!user) {
    return null;
  }

  return {
    name: user.name,
    username: user.login,
    email: user.email,
    avatar: user.avatar_url,
    location: user.location,
    company: user.company
  };
}

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
        user: mapUserState(action.user)
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
