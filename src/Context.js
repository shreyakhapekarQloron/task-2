import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

// Create a context to share the state between components
const Context = createContext();

// Define the initial state for the context
const initialState = {
    isLoading: true,
    data: [],
    error: null,
};

// Create a provider component to wrap your application and provide the context to its children
const AppProvider = ({ children }) => {
    // Use the useReducer hook to manage state with the defined reducer function and initial state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Define a function to fetch data from the API
    const fetchData = async() => {
        try{
            const res = await fetch('https://fakestoreapi.com/products');

            // Check if the response is ok (status code 200)
            if(!res.ok){
                throw new Error('Network response was not ok');
            }

            const data = await res.json();   // Parse the response as JSON

            // Dispatch an action to update the state with the fetched data
            dispatch({type: 'FETCH_SUCCESS', payload: data});
        }
        catch(error){
            // Dispatch an action in case of an error
            dispatch({type: 'FETCH_ERROR', payload: error.message});
        }
    };

    // Use the useEffect hook to run the fetchData function when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only on mount

    const contextValue = {
        ...state,
    };

    console.log('Context Values:', contextValue);
    
    // Provide the state to the children components through the context
    return(
        <Context.Provider value={contextValue}>{children}</Context.Provider>
    );
};

// Create a custom hook to consume the context in functional components
const useGlobalContext = () => {
    return useContext(Context);
};

export {AppProvider, useGlobalContext};