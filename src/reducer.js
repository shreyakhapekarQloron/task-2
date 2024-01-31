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
      const itemId = action.payload;
      const updatedCart = { ...state.cart };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;

      return {
        ...state,
        cart: updatedCart,
      };

    case "REMOVE_FROM_CART":
      const removedItemId = action.payload;
      const updatedRemovedCart = { ...state.cart };
      updatedRemovedCart[removedItemId] = Math.max(0, state.cart[removedItemId] - 1);

      return {
        ...state,
        cart: updatedRemovedCart,
      };

    default:
      return state;
  }
};

export default reducer;
