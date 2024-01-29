import React from "react";

const Pagination = ({totalPosts, postsPerPage, currentPage, setCurrentPage}) =>{
    const pages = [];

    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i);
    }

    return(
        <div className="pagination">
            {pages.map((index) => (
                <button key={index}onClick={() => setCurrentPage(index)} className={index === currentPage ? 'active' : ''}>{index}</button>
            ))}
        </div>
    );
};

export default Pagination;