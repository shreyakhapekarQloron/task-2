import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./Context";
import Pagination from "./Pagination";

const Home = () => {
  // Use the custom hook to access data, loading state, and error from the context
  const { isLoading, data, error } = useGlobalContext();
  const [sortedData, setSortedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

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
      <button className="btn">Logout</button>

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
        setCurrentPage={setCurrentPage} currentPage={currentPage}
      />

      <div className="product_container">
        {currentPosts.map((item) => {
          // object destructoring: to prevent writing currProduct. again & again.
          const { id, title, category, image, description, price, rating } =
            item;

          return (
            <div className="card" key={id}>
              <div className="card-img">
                <img src={image} alt={title} />
              </div>
              <h2>{title}</h2>
              <p>$ {price}</p>
              <h3>{category}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
