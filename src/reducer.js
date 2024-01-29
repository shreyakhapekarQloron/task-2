const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
