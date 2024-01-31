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

    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: state.cart[action.payload] + 1,
        },
      };
    case "REMOVE_FROM_CART":
      // You can implement logic to decrement or remove an item from the cart
      // based on your requirements.
      // For simplicity, let's just decrement the quantity for now.
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: Math.max(0, state.cart[action.payload] - 1),
        },
      };

    default:
      return state;
  }
};

export default reducer;
