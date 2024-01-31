import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "./reducer";

// Create a context to share the state between components
const Context = createContext();

const getDefaultCart = (data) => {
  let cart = {};
  for (let i = 1; i < data.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

// Define the initial state for the context
const initialState = {
  isLoading: true,
  data: [],
  error: null,
  cart: getDefaultCart([]),
};

// Create a provider component to wrap your application and provide the context to its children
const AppProvider = ({ children }) => {
  // Use the useReducer hook to manage state with the defined reducer function and initial state
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        // Check if the response is ok (status code 200)
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedData = await res.json(); // Parse the response as JSON

        // Dispatch an action to update the state with the fetched data
        dispatch({ type: "FETCH_SUCCESS", payload: fetchedData });
        
      } catch (error) {
        // Dispatch an action in case of an error
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchData(); // Fetch data first
  }, []);


//   const [cartItems, setCartItems] = useState(() => getDefaultCart([])); 

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = state.data.find((d) => d.id === Number(item));

//         // Ensure itemInfo is found before accessing its properties
//         if (itemInfo) {
//           totalAmount += cartItems[item] * itemInfo.price;
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };

//   const updateCartItemCount = (newAmount, itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
//   };

//   const checkout = () => {
//     setCartItems(getDefaultCart());
//   };



  const contextValue = {
    ...state,
    dispatch,
    // addToCart,
    // updateCartItemCount,
    // removeFromCart,
    // getTotalCartAmount,
    // checkout,
  };

  console.log("Context Values:", contextValue);

  // Provide the state to the children components through the context
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// Create a custom hook to consume the context in functional components
const useGlobalContext = () => {
  return useContext(Context);
};

export { AppProvider, useGlobalContext };