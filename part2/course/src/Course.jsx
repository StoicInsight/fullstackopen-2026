import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = (props) => {
  const getTotal = (parts) => {
    const initialValue = 0;
    return parts.reduce((s, p) => s.exercises + p.exercises);
  };

  return (
    <div>
      {props.course.map((cour, i) => (
        <div key={i}>
          <Header course={cour} />
          <Content course={cour} />
          <h4>Total of {getTotal(cour.parts)} exercises</h4>
        </div>
      ))}
    </div>
  );
};

export default Course;
