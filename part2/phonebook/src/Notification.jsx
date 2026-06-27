import React from 'react';
import './index.css';

const Notification = ({ message, type }) => {
  console.log('Notification', message);
  if (type === 'success') {
    return <h1 className='success'>{message}</h1>;
  }
  if (type === 'error') {
    return <h1 className='error'>{message}</h1>;
  }
  if (type === 'remove') {
    return <h1 className='remove'>{message}</h1>;
  }
};

export default Notification;
