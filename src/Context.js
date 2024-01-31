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
  data.forEach((item) => {
    cart[item.id] = 0;
  });
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

  const contextValue = {
    ...state,
    dispatch,
  };

  console.log("Context Values:", contextValue);

  // Provide the state to the children components through the context
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// Create a custom hook to consume the context in functional components
const useGlobalContext = () => {
  const context = useContext(Context);

  // Log context for debugging
  console.log("Context:", context);

  if (!context) {
    console.error("Context not available. Make sure AppProvider is properly set up.");
    return {};
  }

  return context;
};

export { AppProvider, useGlobalContext };