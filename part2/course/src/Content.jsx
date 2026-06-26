import React from 'react';

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part, i) => (
        <li key={i}>
          {part.name} {part.exercises}
        </li>
      ))}
    </>
  );
};

export default Content;
