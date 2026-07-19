import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form action='submit'>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='username' />
        <br />
        <label htmlFor='password'>Password:</label>
        <input type='text' id='password' />
      </form>
    </div>
  );
};

export default Login;
