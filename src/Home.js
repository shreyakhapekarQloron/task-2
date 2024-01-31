import React, { useState } from "react";
import { useGlobalContext } from "./Context";
import Pagination from "./Pagination";
import { useAuth0 } from "@auth0/auth0-react";
import { Cart } from "./Cart/Cart";

const Home = () => {
  // Use the custom hook to access data, loading state, and error from the context
  const { isLoading, data, error, dispatch, cart } = useGlobalContext();

  const [sortedData, setSortedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [showCart, setShowCart] = useState(false); // State to control cart visibility

  // Calculate the indexes of the items to display on the current page
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = sortedData
    ? sortedData.slice(firstPostIndex, lastPostIndex)
    : data.slice(firstPostIndex, lastPostIndex);

  const ascEvent = () => {
    const sortedAscData = [...data].sort((a, b) => a.price - b.price);
    setSortedData(sortedAscData);
  };

  const descEvent = () => {
    const sortedDescData = [...data].sort((a, b) => b.price - a.price);
    setSortedData(sortedDescData);
  };

  const resetEvent = () => {
    setSortedData(null);
  };

  const addToCart = (itemId) => {
    console.log("Adding to Cart:", itemId);
    if (dispatch) {
      dispatch({ type: "ADD_TO_CART", payload: itemId });
    } else {
      console.error("Dispatch function not available.");
    }
  };
  
  const removeFromCart = (itemId) => {
    console.log("Removing from Cart:", itemId);
    if (dispatch) {
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    } else {
      console.error("Dispatch function not available.");
    }
  };
  

  // If data is still loading, display a loading message
  if (isLoading) {
    return <p>Loading....</p>;
  }

  // If there's an error fetching data, display an error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log("Products:", data);

  // If data is fetched successfully, display the data
  return (
    <>
      <div className="btn-container">
        {isAuthenticated ? (
          <button
            className="btn"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button className="btn" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>

      <div className="btn-container">
        <button className="btn" onClick={ascEvent}>
          Ascending
        </button>
        <button className="btn" onClick={resetEvent}>
          Data
        </button>
        <button className="btn" onClick={descEvent}>
          Descending
        </button>
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div className="product_container">
        {currentPosts.map((item) => {
          // object destructuring: to prevent writing currProduct. again & again.
          const { id, title, category, image, description, price, rating } = item;

          const isInCart = cart[id] > 0;

          return (
            <div className="card" key={id}>
              <div className="card-img">
                <img src={image} alt={title} />
              </div>
              <h2>{title}</h2>
              <p>$ {price}</p>
              <h3>{category}</h3>

              {isInCart ? (
                // Render "Remove from Cart" button when item is in the cart
                <button className="addToCartBtn" onClick={() => removeFromCart(id)}>
                  Remove from Cart
                </button>
              ) : (
                // Render "Add to Cart" button when item is not in the cart
                <button className="addToCartBtn" onClick={() => addToCart(id)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div> 
    </>
  );
};

export default Home;