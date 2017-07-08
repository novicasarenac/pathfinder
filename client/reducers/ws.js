const initialState = {
  id: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECTED':
      return {
        id: action.id
      };

    default:
      return state;
  }
};

export default reducer;
