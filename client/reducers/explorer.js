const initialState = {
  isWaiting: false,
  recommendedRepos: null,
  interestingPeople: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXPLORE_REQUEST_SENT':
      return {
        ...state,
        isWaiting: true
      };

    case 'EXPLORE_RECOMMENDATION':
      return {
        ...state,
        isWaiting: false,
        recommendedRepos: action.repos,
        interestingPeople: action.people
      };

    case 'EXPLORE_ERROR_RESPONSE':
      return {
        ...state,
        isWaiting: false
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
