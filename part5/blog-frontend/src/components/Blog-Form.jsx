import { useState } from 'react';
import blogService from '../services/blog';
const BlogForm = (props) => {
  return (
    <form action='submit' className='form' onSubmit={props.createNewBlog}>
      <h1>Create new blog</h1>
      <label htmlFor=''>
        <input
          type='text'
          value={props.newBlog.title}
          name='title'
          onChange={props.handleBlogChange}
          className='input'
          placeholder='Title'
        />
      </label>
      <label htmlFor=''>
        <input
          type='text'
          value={props.newBlog.author}
          name='author'
          onChange={props.handleBlogChange}
          className='input'
          placeholder='Author'
        />
      </label>
      <label htmlFor=''>
        <input
          type='text'
          value={props.newBlog.url}
          name='url'
          onChange={props.handleBlogChange}
          className='input'
          placeholder='URL'
        />
      </label>
      <div className='btn-wrap'>
        <button className='button' type='submit'>
          Create
        </button>
        <button className='remove'>Cancel</button>
      </div>
    </form>
  );
};

export default BlogForm;
