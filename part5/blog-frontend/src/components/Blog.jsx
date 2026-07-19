import React, { useState } from 'react';

const Blog = ({ blog, removeBlog, updateLikes }) => {
  const [view, setView] = useState(false);
  return (
    <div className='blog-item'>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      {view ? (
        <div className=''>
          <a href=''>{blog.url}</a>
          <div className='btn-wrap'>
            <h4> Likes:{blog.likes}</h4>
            <button className='button' onClick={(e) => updateLikes(e, blog)}>
              Like
            </button>
          </div>
          <div className='btn-wrap'>
            <button className='hide' onClick={() => setView(false)}>
              Hide
            </button>
            <button className='remove' onClick={() => removeBlog(blog.id)}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button className='button' onClick={() => setView(true)}>
          View
        </button>
      )}
    </div>
  );
};

export default Blog;
