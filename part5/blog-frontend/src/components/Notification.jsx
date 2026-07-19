import React from 'react';

const Notification = (note) => {
  return (
    <div className={`${note.note.type}-notification`}>
      <h1>{note.note.message}</h1>
    </div>
  );
};

export default Notification;
